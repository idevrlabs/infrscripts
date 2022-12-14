package main

import (
	"flag"
	"log"
	"net"
	"net/http"
	"os"

	"github.com/labstack/echo"
	"github.com/sirupsen/logrus"
)

func main() {
	var socketPath string
	flag.StringVar(&socketPath, "socket", "/run/guest/volumes-service.sock", "Unix domain socket to listen on")
	flag.Parse()

	os.RemoveAll(socketPath)
	
	logrus.New().Infof("Starting listening on %s\n", socketPath)
	router := echo.New()
	router.HideBanner = true

	startURL := ""

	ln, err := listen(socketPath)
	if err != nil {
		log.Fatal(err)
	}
	router.Listener = ln

	router.GET("/hello", hello)

	router.GET("/signin",signin);

	router.GET("/signoff",signoff);

	router.GET("/signup",signup);

	log.Fatal(router.Start(startURL))
}

func listen(path string) (net.Listener, error) {
	return net.Listen("unix", path)
}

func hello(ctx echo.Context) error {
	return ctx.JSON(http.StatusOK, HTTPMessageBody{Message: "hello"})
}

type HTTPMessageBody struct {
	Message string
}

func signin(ctx echo.Context) error {
	//username string, password string,
	//var output=strings.TrimPrefix(r.URL.Path, "/signin/");
	return ctx.JSON(http.StatusOK, HTTPMessageBody{Message: "Sign In" });
}

func signoff(ctx echo.Context) error {
	//token string,
	//var output=ctx.Request.URL.Query()["token"];
	return ctx.JSON(http.StatusOK, HTTPMessageBody{Message: "Sign Off"});
}

func signup(ctx echo.Context) error {
	//emailid string, password string,fname string, lname string, cell string, 
	return ctx.JSON(http.StatusOK, HTTPMessageBody{Message: "Sign Up"});
}
