
<h1 align="center">Cryto Binance Local Order Book</h1>
<img  align="center" src="./images/cypto_image.jpg" width="100%">

## Project Description
AIM: To create a local order book that replicates the Binance order book. This local copy will be used to compute weighted buy and sell prices. 

## System Design Overview
The system design objective is to create high level of maintainable design, correct and extendable.


**Overview Design of the App**


<img src="./images/system-design.png" width="130%"> 

## Instruction to run the Application
First time running process 
```
git clone https://github.com/shouryaraj/cryto-binance-local-order-book.git

cd cryto-binance-local-order-book

npm install

node app.js

```
Normal running of application
```
node app.js
```

**Note:**  User have the option to put the desire value of transaction quantity either for buy or sell  

App.js file configuration to change *Currency, time and trade option*

![image](https://user-images.githubusercontent.com/47905424/123509796-fc4b8180-d6ba-11eb-9b4e-446525e635d3.png)




## Current work
+ Creating a local copy of the Binance’s BTCUSDT market and easily can be changed for other assets.
+ Weighted pricing to buy or sell the aforementioned quantity of Bitcoin.

## Future Work
+ Detailed design and explanation of the system in the Readme.md
+ Look for more optimised solution

