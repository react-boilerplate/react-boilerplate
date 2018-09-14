# Install node-gyp build tools
There are a lot of node modules those require C/C++ compilation while installing them. For improved performance, some modules are written partially in C/C++ and make calls directly to the Node runtime (V8). Such modules are called native modules that are needed to re-built on user's machine. For example [node-ffi](https://github.com/node-ffi/node-ffi) is a native module that I needed once to link a C++ DLL file in my react application.

To build or compile these modules, we need to install [node-gyp](https://github.com/nodejs/node-gyp) on our dev machine. ```node-gyp``` is a cross-platform command-line tool written in Node.js for compiling native addon modules for Node.js.

Before installing actual node-gyp, you will have to setup a few things in respective OS  first:

## On Windows
Install all the required tools and configurations using Microsoft's [windows-build-tools using](https://github.com/felixrieseberg/windows-build-tools) ```npm install --global --production windows-build-tools``` from an elevated PowerShell or CMD.exe (run as Administrator).

## On Ubuntu 
##### 1. First of all, install the "make" build tool in Ubuntu with the following commands:
```Shell
sudo apt-get update && \
sudo apt-get install build-essential software-properties-common -y;
```
##### 2. Then you need to install the a proper C/C++ compiler toolchain. We will be installing GCC here with the following commands:
```Shell
sudo add-apt-repository ppa:ubuntu-toolchain-r/test -y && \
sudo apt-get update && \
sudo apt-get install gcc-snapshot -y && \
sudo apt-get update && \
sudo apt-get install gcc-6 g++-6 -y && \
sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-6 60 --slave 
/usr/bin/g++ g++ /usr/bin/g++-6 && \
sudo apt-get install gcc-4.8 g++-4.8 -y && \
sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.8 60 --slave 
/usr/bin/g++ g++ /usr/bin/g++-4.8;
```
##### 3. Install python 2.7 version. (Note: Python 3 is not supported by node-gyp).
```Shell
sudo apt update
sudo apt upgrade
sudo apt install python2.7 python-pip
```

## Finally install the main module with the following command:
```Shell
npm install -g node-gyp
```

Installing all the above things will put your mind on ease while developing an electron app which requires at least one native module and obviously if you are building a desktop app, it will require communication with some operating system components and most of them are written as native dependencies.