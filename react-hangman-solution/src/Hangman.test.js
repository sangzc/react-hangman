import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Hangman from "./Hangman";

let wrapper;

beforeEach(function() {
  wrapper = shallow(<Hangman />);
  wrapper.setState({ answer: "apple" });
});

it("renders succesfully", function() {
  shallow(<Hangman />);
});

it("matches snapshot on initial render", function() {
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});

it("matches snapshot after losing", function() {
  wrapper.setState({ nWrong: 6, guessed: new Set("b", "c", "d", "f", "g") });
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});

it("handles correct guesses", function() {
  wrapper
    .find("button[value='a']")
    .simulate("click", { target: { value: "a" } });
  expect(wrapper.state().nWrong).toEqual(0);
  expect(wrapper.state().guessed).toEqual(new Set("a"));
  expect(wrapper.find(".Hangman-word").text()).toEqual("a____");
  expect(wrapper.find("img").props().src).toEqual("0.jpg");
});

it("handles incorrect guesses", function() {
  wrapper
    .find("button[value='b']")
    .simulate("click", { target: { value: "b" } });
  expect(wrapper.state().nWrong).toEqual(1);
  expect(wrapper.state().guessed).toEqual(new Set("b"));
  expect(wrapper.find(".Hangman-word").text()).toEqual("_____");
  expect(wrapper.find("img").props().src).toEqual("1.jpg");
});

it("removes the keys if you lose", function() {
  wrapper.setState({ nWrong: 5, guessed: new Set("p", "x", "y", "z", "w", "k") });
  expect(wrapper.find("button").length).toEqual(27);
  wrapper
    .find("button[value='j']")
    .simulate("click", { target: { value: "j" } });
  expect(wrapper.find("button").length).toEqual(1);
  expect(wrapper.text()).toContain("You lose: apple");
})

it("restarts succesfully", function() {
  wrapper.setState({ nWrong: 5, guessed: new Set("p", "x", "y", "z", "w", "k") });
  wrapper.find(".Hangman-restart").simulate("click");
  expect(wrapper.state().nWrong).toEqual(0);
  expect(wrapper.state().guessed).toEqual(new Set);
})
