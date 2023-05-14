package main

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

func main() {
	fmt.Println("starting")
	//	downloadVocabs()
	//	downloadKanjis()
	vocabMapping := readVocabs()
	mappings := readKanji(vocabMapping)

	// Write output
	file, err := os.OpenFile("output.json", os.O_CREATE|os.O_WRONLY, os.ModePerm)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()
	encoder := json.NewEncoder(file)
	err = encoder.Encode(mappings)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("finshed")
}

func readKanji(vocabMapping map[string]string) map[string]string {
	files, err := ioutil.ReadDir("./kanji/")
	if err != nil {
		log.Fatal(err)
	}

	mappings := make(map[string]string)

	for _, file := range files {
		f, err := os.Open("./kanji/" + file.Name())
		if err != nil {
			log.Fatal(err)
		}
		defer f.Close()

		// create a new decoder
		var dec *json.Decoder = json.NewDecoder(f)
		if err != nil {
			log.Fatal(err)
		}

		var resp WaniKaniKanjiResponse

		// decode the data
		err = dec.Decode(&resp)

		for _, d := range resp.Data {
			if len(d.Data.Readings) > 0 {
				for _, reading := range d.Data.Readings {
					if reading.Primary {
						// Maybe there's not a vocab pronunciatoin that matches

						if _, ok := vocabMapping[reading.Reading]; ok {
							mappings[reading.Reading] = vocabMapping[reading.Reading]
						}
					}
				}
			}
		}
	}

	return mappings
	//	file, err := os.OpenFile("output.json", os.O_CREATE|os.O_WRONLY, os.ModePerm)
	//	if err != nil {
	//		log.Fatal(err)
	//	}
	//	defer file.Close()
	//	encoder := json.NewEncoder(file)
	//	err = encoder.Encode(mappings)
	//	if err != nil {
	//		log.Fatal(err)
	//	}
	//	fmt.Println("finshed")
}

func readVocabs() map[string]string {
	files, err := ioutil.ReadDir("./vocabs/")
	if err != nil {
		log.Fatal(err)
	}

	mappings := make(map[string]string)

	for _, file := range files {
		f, err := os.Open("./vocabs/" + file.Name())
		if err != nil {
			log.Fatal(err)
		}
		defer f.Close()

		// create a new decoder
		var dec *json.Decoder = json.NewDecoder(f)
		if err != nil {
			log.Fatal(err)
		}

		// initialize the storage for the decoded data
		var resp WaniKaniVocabResponse

		// decode the data
		err = dec.Decode(&resp)

		for _, d := range resp.Data {
			if len(d.Data.PronunciationAudios) > 0 {
				pronunciation := d.Data.PronunciationAudios[0].Metadata.Pronunciation
				fmt.Println("pronunciation", d.Data.PronunciationAudios[0].Metadata)
				// Assume first mapping is kyoko and mp3
				mappings[pronunciation] = d.Data.PronunciationAudios[0].URL
			}
		}
	}

	return mappings
	//	file, err := os.OpenFile("output.json", os.O_CREATE|os.O_WRONLY, os.ModePerm)
	//	if err != nil {
	//		log.Fatal(err)
	//	}
	//	defer file.Close()
	//	encoder := json.NewEncoder(file)
	//	err = encoder.Encode(mappings)
	//	if err != nil {
	//		log.Fatal(err)
	//	}
	//	fmt.Println("finshed")
}

type PronunciationAudios struct {
	URL      string `json:"url"`
	Metadata struct {
		Gender        string `json:"gender"`
		Pronunciation string `json:"pronunciation"`
	} `json:"metadata"`
}
type VocabData struct {
	Data struct {
		PronunciationAudios []PronunciationAudios `json:"pronunciation_audios"`
	} `json:"data"`
}

type WaniKaniVocabResponse struct {
	Pages struct {
		NextURL string `json:"next_url"`
	} `json:"pages"`
	Data []VocabData `json:"data"`
}

func downloadVocabs() {
	page := 0
	key := os.Getenv("WANIKANI_KEY")
	if key == "" {
		log.Fatal("missing env var WANIKANI_KEY")
	}
	url := "https://api.wanikani.com/v2/subjects?types=vocabulary"

	client := http.Client{}

	for {
		fmt.Println("requesting to url", url)
		req, err := http.NewRequest("GET", url, nil)
		req.Header.Add("Authorization", "Bearer "+key)
		resp, err := client.Do(req)
		if err != nil {
			panic(err)
		}

		body, err := io.ReadAll(resp.Body)
		defer resp.Body.Close()

		// Write file
		fileName := "./vocabs/page-" + fmt.Sprintf("%d", page) + ".json"
		fmt.Println("writing", fileName)
		err = os.WriteFile(fileName, body, 0644)
		if err != nil {
			panic(err)
		}

		var wkResp WaniKaniVocabResponse
		err = json.Unmarshal(body, &wkResp)
		if err != nil {
			panic(err)
		}

		fmt.Println("nexturl is", wkResp.Pages.NextURL)
		if wkResp.Pages.NextURL == "" {
			return
		}

		url = wkResp.Pages.NextURL
		page = page + 1
	}
}

type WaniKaniKanjiResponse struct {
	Pages struct {
		NextURL string `json:"next_url"`
	} `json:"pages"`
	Data []KanjiData `json:"data"`
}

type KanjiData struct {
	Data struct {
		Readings []struct {
			Reading        string `json:"reading"`
			Type           string `json:"type"`
			AcceptedAnswer bool   `json:"accepted_answer"`
			Primary        bool   `json:"primary"`
		} `json:"readings"`
	} `json:"data"`
}

func downloadKanjis() {
	page := 0
	key := os.Getenv("WANIKANI_KEY")
	if key == "" {
		log.Fatal("missing env var WANIKANI_KEY")
	}
	url := "https://api.wanikani.com/v2/subjects?types=kanji"

	client := http.Client{}

	for {
		fmt.Println("requesting to url", url)
		req, err := http.NewRequest("GET", url, nil)
		req.Header.Add("Authorization", "Bearer "+key)
		resp, err := client.Do(req)
		if err != nil {
			panic(err)
		}

		body, err := io.ReadAll(resp.Body)
		defer resp.Body.Close()

		// Write file
		fileName := "./kanji/page-" + fmt.Sprintf("%d", page) + ".json"
		fmt.Println("writing", fileName)
		err = os.WriteFile(fileName, body, 0644)
		if err != nil {
			panic(err)
		}

		var wkResp WaniKaniKanjiResponse
		err = json.Unmarshal(body, &wkResp)
		if err != nil {
			panic(err)
		}

		fmt.Println("nexturl is", wkResp.Pages.NextURL)
		if wkResp.Pages.NextURL == "" {
			return
		}

		url = wkResp.Pages.NextURL
		page = page + 1
	}
}
