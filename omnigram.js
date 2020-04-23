/*
   ____  __  ____   ________________  ___    __  ___
  / __ \/  |/  / | / /  _/ ____/ __ \/   |  /  |/  /
  / / / / /|_/ /  |/ // // / __/ /_/ / /| | / /|_/ /
  / /_/ / /  / / /|  // // /_/ / _, _/ ___ |/ /  / /
  \____/_/  /_/_/ |_/___/\____/_/ |_/_/  |_/_/  /_/

   Project      : Configurable Socket (TCP/UDP)
   Author       : Eddy Yanto
   Created      : 22/04/2020
   Website      : http://omnigram.net
   Description  : This project demonstrates the flexibility of iViewer platform
                  parent enable the system's IP and port on-the-fly reconfiguration,
                  it works for both TCP and UDP socket and can be used for socket
                  testing tool.
*/

var Omnigram = {
    tcp_ip: "",
    tcp_port: 0,
    tcp_message : "",
    
    udp_ip: "",
    udp_port: 0,
    udp_message : "",

    setup: function() {
        CF.setSystemProperties("OmnigramTCP", {
           enabled: false
        });
        CF.setSystemProperties("OmnigramUDP", {
           enabled: false
        });
    },

    tcpConnect: function(){
        var parent = this;
        CF.getJoin("s20", function(join, tcp_ip) {
            parent.tcp_ip = tcp_ip;
        });
        CF.getJoin("s21", function(join, tcp_port) {
            parent.tcp_port = parseInt(tcp_port);
        });
        setTimeout(function(){
            CF.setSystemProperties("OmnigramTCP", {
               enabled: true,
               address: parent.tcp_ip,
               port: parent.tcp_port,
               connect: "d26"
            });
        }, 500);
    },

    tcpSend: function(){
        var parent = this;
        CF.getJoin("s22", function(join, tcp_message) {
            parent.tcp_message = tcp_message;
        });
        setTimeout(function(){
            CF.send("OmnigramTCP", parent.tcp_message + "\r\n");
        }, 100);
    },

    udpConnect: function(){
        var parent = this;
        CF.getJoin("s30", function(join, udp_ip) {
            parent.udp_ip = udp_ip;
        });
        CF.getJoin("s31", function(join, udp_port) {
            parent.udp_port = parseInt(udp_port);
        });

        setTimeout(function(){
            CF.setSystemProperties("OmnigramUDP", {
               enabled: true,
               address: parent.udp_ip,
               port: parent.udp_port,
               connect: "d36"
            });
        }, 500);
    },

    udpSend: function(){
        var parent = this;
        CF.getJoin("s32", function(join, udp_message) {
            parent.udp_message = udp_message;
        });
        setTimeout(function(){
            CF.send("OmnigramUDP", parent.udp_message + "\r\n");
        }, 100);
    }
};

CF.modules.push({
    name: "Omnigram",
    setup: Omnigram.setup,
    object: Omnigram,
    version: 1.0
});