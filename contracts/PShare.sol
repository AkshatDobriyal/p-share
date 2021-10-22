// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <=0.8.9;

contract PShare {
    string public name;
    uint public imageCount = 0;

    struct Image {
        uint id;
        string imageHash;
        string description;
        uint tipAmount;
        address payable author;
    }

    mapping(uint => Image) public images;

    constructor() public {
        name = "PShare";
    }

    event ImageUploaded(
        uint id,
        string imageHash,
        string description,
        uint tipAmount,
        address payable author
    );

    event ImageTipped(
        uint id,
        string imageHash,
        string description,
        uint tipAmount,
        address payable author
    );

    function uploadImage(string memory _imageHash, string memory _description) public {
        // check if image hash exists
        require(bytes(_imageHash).length > 0, "Invalid image hash");
        // check if image description exists
        require(bytes(_description).length > 0, "Please add image description");
        // check if the uploader address exists
        require(msg.sender != address(0));

        imageCount++;

        address payable _author = address(uint160(msg.sender));
        images[imageCount] = Image(imageCount, _imageHash, _description, 0, _author);

        // trigger event
        emit ImageUploaded(imageCount, _imageHash, _description, 0, _author);

    }

    function tipImageOwner(uint _id) public payable {
        // check if the id is valid
        require(_id > 0 && _id <= imageCount, "Invalid image id");

        // fetch the image
        Image memory _image = images[_id];

        // fetch the author
        address payable _author = _image.author;

        // pay the author by sending ethers
        _author.transfer(msg.value);

        // increment the tip amount;
        _image.tipAmount += msg.value;

        // updating the image
        images[_id] = _image;

        // trigger event
        emit ImageTipped(_id, _image.imageHash, _image.description, _image.tipAmount, _author);
    }

}