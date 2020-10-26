package main

import (
	"fmt"
	"net/http"
	"os"
	"text/template"
)

func index(w http.ResponseWriter, r *http.Request) {
	t := template.Must(template.ParseFiles("index.html"))
	t.Execute(w, "")
}

func main() {

	//==================== GO ====================//
	ip, defip := os.LookupEnv("GOIP")
	port, defport := os.LookupEnv("GOPORT")

	if !defip {
		ip = "182.18.7.9"
	}

	if !defport {
		port = "8000"
	}

	http.Handle("/layout/", http.StripPrefix("/layout/", http.FileServer(http.Dir("layout/"))))

	http.HandleFunc("/", index)

	fmt.Println("Escuchando por IP:" + ip + " PORT:" + port)

	http.ListenAndServe(":"+port, nil)
}
