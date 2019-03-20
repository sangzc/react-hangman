import React from 'react';
// import ReactDOM from 'react-dom';
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json"
import Hangman from './Hangman';

it('renders without crashing', function(){
    shallow(<Hangman />);
});

// snapshot test
it("matches MOUNT snapshot", function() {
    let wrapper = mount(<Hangman />);
    wrapper
        .find("button[value='a']")
        .simulate("click", { target: { value: "a"}});
        let serialized = toJson(wrapper);
        expect(serialized).toMatchSnapshot();
});

    // let serialized = wrapper.find("Hangman-word").first();
    // expect(serialized).to("a____");