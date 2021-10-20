// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <=0.8.9;

contract PShare {
    string public name;
    uint public imageCount = 0;

    struct Image {
        uint id;
        string imageHash;
        string descriprion;
        address payable author;

    }

    mapping(uint => Image) images;

    constructor() public {
        name = "PShare";
    }

}