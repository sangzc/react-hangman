import React from 'react';
// import ReactDOM from 'react-dom';
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json"
import Hangman from './Hangman';

it('renders without crashing', function(){
    shallow(<Hangman />);
});

// snapshot test
// it("matches MOUNT snapshot", function() {
//     let wrapper = mount(<Hangman />);
//     wrapper
//         .find("button[value='a']")
//         .simulate("click", { target: { value: "a"}});
//         let serialized = toJson(wrapper);
//         expect(serialized).toMatchSnapshot();
// });

// when click letter that is part of the word should show the letter along with _ with the rest    
it("matches snaphot of one 'a' click", function() {
    let wrapper = mount(<Hangman />);
    wrapper
        .find("button[value='a']")
        .simulate("click", { target: { value: "a"}});
        expect(wrapper.find(".Hangman-word").text()).toEqual("a____");
});

//test for after 6 wrong guesses the image disappear
it("detecting bug of image disappear after 6 wrong guesses", function() {
    let wrapper = mount(<Hangman />);
    wrapper.setState({ nWrong: 7, guessed: new Set("b", "c", "d", "f", "g", "z") });
    expect(wrapper.find("img").props().src).toEqual(undefined);
    //expect(wrapper.find("img").prop('src').exists()).toEqual(true);
  });