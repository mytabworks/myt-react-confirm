[![github](https://img.shields.io/badge/-github-gray?style=for-the-badge&logo=github)](https://github.com/mytabworks/myt-react-confirm#readme)
[![npm](https://img.shields.io/npm/v/myt-react-confirm?color=crimson&logo=npm&style=for-the-badge)](https://www.npmjs.com/package/myt-react-confirm)
[![yarn](https://img.shields.io/npm/v/myt-react-confirm?color=blue&label=yarn&style=for-the-badge&logo=yarn)](https://classic.yarnpkg.com/en/package/myt-react-confirm)
[![bundlephobia](https://img.shields.io/bundlephobia/minzip/myt-react-confirm?color=%2371bba4&logo=bundlephobia&style=for-the-badge)](https://bundlephobia.com/result?p=myt-react-confirm)

# myt-react-confirm
This react confirmation popover was build from the ground up, which is use to solve the problem of confirmation the actions before deleting, updating, approving, rejecting, you name it..

- [Installation](#installation)
- [How To Use](#how-to-use)
    - [Importing](#import-to-your-project)
    - [Basic Usage](#basic-usage)
    - [Aliasing Usage](#aliasing-usage)
    - [Animation Usage](#animation-usage)
    - [Change Labels Usage](#change-labels-usage) 
    - [Prompt Usage](#prompt-usage)
    - [Prompt With Form Usage](#prompt-with-form-usage)
    - [Advance Usage](advance-usage)
- [Properties](#properties)  
- [License](#license)

# installation
npm
```
npm i myt-react-confirm
```

yarn
```
yarn add myt-react-confirm
```

# How to use


## import to your project
```js
import Confirm from "myt-react-confirm"
```
  
## Basic Usage
```js
    <Confirm label="Click Me" message="are you sure?" onConfirm={() => alert("confimed")} onCancel={() => alert("cancel")}/>
```


## Aliasing Usage
You can use a custom button element type for this component.<br/><br/>

```js
import Confirm from "myt-react-confirm"
import {Button} from "react-bootstrap"
```
```js
    <Confirm label="Customize Button" as={Button} size="sm" variant="success"  message="are you sure?" onConfirm={() => alert("confimed")} onCancel={() => alert("cancel")}/>
```


## Animation Usage
You can use a custom animation class using @keyframe for this component.<br/>
[animate.css](https://daneden.github.io/animate.css/) for cool animations.<br/><br/>

```js
    <Confirm
        animation={{
          enter: "animated slideInLeft",
          exit: "animated slideOutRight"
        }}
        label="I'm gonna slide" 
        timing={1000}
        placement="bottom-right"
        message="did it show cool animations?"
        onConfirm={() => alert("confimed")} 
        onCancel={() => alert("cancel")} 
      />
```

## Change Labels Usage
You can change the confirm and cancel label.<br/><br/> 

```js
    <Confirm
        animation={{
          enter: "animated bounceInLeft",
          exit: "animated bounceOutRight"
        }}
        label={{
          target: "I Have Override Label",
          confirm: "Yes! It's Cool",
          cancel: "Not Cool!"
        }} 
        timing={1000}
        placement="bottom"
        message="did it show cool animations?"
        onConfirm={() => {
          alert("confimed");
        }}
        stayMountedWhenExited
        onCancel={() => {
          alert("cancel");
        }}
      />
```

## Prompt Usage
You can put a input element type inside confirm.<br/><br/> 

```js
    <Confirm
        animation={{
          enter: "animated fadeInLeft",
          exit: "animated fadeOutRight"
        }}
        label={{
          target: "Click Me",
          confirm: "Say it",
          cancel: "I'm not cool"
        }} 
        timing={1000}
        placement="top-right"
        message="say something cool"
        onConfirm={event => alert(event.target.value)}
        onCancel={() => alert("cancel")}
    >
        <input type="text" name="confirm" />
    </Confirm>
```

## Prompt with Form Usage
You can put a form element inside confirm and you can use `preventDefault()` to prevent it from exiting.<br/><br/> 

```js
    <Confirm
        animation={{
          enter: "animated fadeInLeft",
          exit: "animated fadeOutRight"
        }}
        label={{ 
          target: "Log in", 
          confirm: "Submit" 
        }} 
        timing={1000}
        placement="top-right"
        message=""
        onConfirm={event => {
          const user = event.FormData.get("user");
          const password = event.FormData.get("password");
          const error = document.getElementById("error");
          if (!user) {
            event.preventDefault();
            error.textContent = "Username is required";
          } else if (!password) {
            const focusOnPassword = document.getElementById("password");
            event.preventDefault(focusOnPassword);
            error.textContent = "Password is required";
          } else {
            alert(`username: ${user}\n password: ${password}`);
          }
        }}
        onCancel={() => alert("cancel")}
      >
        <form>
          <p id="error" style={{ color: "crimson" }}/>
          <input type="text" id="user" name="user" placeholder="username..." /><p /> 
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
          />
        </form>
    </Confirm>
```

## Advance Usage
This package is dependent on [`myt-react-snippet`](https://www.npmjs.com/package/myt-react-snippets) as animation refactor. so you can use it too!!<br/><br/> 

```js
import React from "react";
import Confirm from "myt-react-confirm"
import { TransitionGroup, Transition, Animation } from "myt-react-snippets";  
import { ListGroup, ListGroupItem, Button, Container } from "react-bootstrap"

let unique = 0;

const uniqueKey = () => unique++
export const TodoWithConfirm2 = () => {
  const [state, setState] = React.useState({
    isProcess: false,
    items: [
      { id: uniqueKey(), text: "list-1", placement: "bottom" },
      { id: uniqueKey(), text: "list-2", placement: "right" },
      { id: uniqueKey(), text: "list-3", placement: "top" }
    ]
  });
  return (
    <Container>
      <Animation
        in={!state.isProcess}
        className="animated"
        suffix={{ enter: " bounceInRight", exit: " bounceOutRight" }}
      >
        <Confirm
          label={{ target: <span>✚ add list</span>, confirm: "Submit" }}
          as={Button}
          placement="left"
          message="Add Todo"
          onConfirm={({ target, preventDefault }) => {
            if (!target.value) {
              preventDefault(target);
              target.style.border = "1px solid crimson";
              target.className = target.className.includes("tada")
                ? "animated bounce"
                : " animated tada";
            } else {
              target.style.border = null;
              setState(prev => ({
                ...prev,
                items: [
                  ...prev.items,
                  {
                    id: uniqueKey(),
                    text: target.value,
                    placement: "bottom-right"
                  }
                ]
              }));
            }
          }}
          style={{ margin: "10px 0" }}
        >
          <input
            type="text"
            placeholder="add name of list..."
            style={{ padding: "3px 10px" }}
          />
        </Confirm>
      </Animation>

      <ListGroup>
        <TransitionGroup>
          {state.items.map(({ id, text, placement }) => {
            return (
              <Transition
                key={id}
                timing={950}
                className="fade"
                onEntered={() =>
                  setState(prev => ({ ...prev, isProcess: false }))
                }
                onExited={() => {
                  setState(prev => ({ ...prev, isProcess: false }));
                }}
              >
                <ListGroupItem>
                  <Confirm
                    as={Button}
                    variant="danger"
                    size="sm"
                    placement={placement}
                    message={`you are deleting "${text}"`}
                    onConfirm={() => {
                      setState(prev => ({
                        isProcess: true,
                        items: prev.items.filter(it => it.id !== id)
                      }));
                    }}
                    label={<span>✗</span>}
                  />
                  {" " + text}
                </ListGroupItem>
              </Transition>
            );
          })}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};
```

## PROPERTIES
All properties that is supported by Confirm Component.<br/>
The datatypes with "*" means it is required.    

|PROPERTY   |DATATYPES    |DEFAULT    |DESCRIPTION|
|-------------|---------------|-------------|-------------|
| as          | ReactNode *      |   button          | it is the trigger of the component| 
| label       | string\|element\|object*        |   &nbsp;          | it is the label of the button and you can use object to change the confirm and cancel `{ target: "Click", confirm: "Yes", cancel: "No" }`|
| message       | string* |   &nbsp;          | it is the message of the popover|
| animation | object |  {enter: "myt-fade-in", exit: "myt-fade-out"} | you can set a customize animations | 
| timing   | number        |   200          | it is the duration of each animation |
| placement    | top\|bottom\|left\|right\|top-left\|top-right\|bottom-left\|bottom-right        | top       | the placement where the popover will show|
| stayMountedWhenExited    | boolean       | false       | it will not unmount the popover. it will only display it `none`|
| onConfirm    | function      |   &nbsp;          | it enables you to know if user choose confirm |
| onCancel     | function      |   &nbsp;          | it enables you to know if user choose cancel |
| children     | any        |      &nbsp;       | it enables to you put a form field or any| 


## License
MIT Licensed. Copyright (c) Mytabworks 2020.