# What Is React?

**React**: a declarative, efficient, and flexible JavaScript library for building user interfaces. React lets you compose complex UIs from small isolated pieces of code called "components".

React has a few different kinds of components. Here, we'll start with `React.Component` subclasses:

```javascript
class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>SnapChat</li>
          <li>Facebook</li>
        </ul>
      </div>
    );
  }
}

/* Example usage: <ShoppingList name="Trey" /> */
/* 
*  This would return:
*    Shopping List for Trey
*      - Instagram
*      - SnapChat
*      - Facebook
*/
```

`Components` are used to tell React what we want to see on the screen. When our data changes, React will efficiently update and re-render our components.

In the example above, ShoppingList is a **React component class**, or **React component type**. A component takes in parameters, called `props` (short for "properties"), and returns a hierarchy of views to display via the `render` method.

The `render` method returns a _description_ of what you want to see on the screen. React takes the description and displays the result. In particular, `render` returns a **React element**, which is a lightweight description of what to render. The most used syntax used by React developers is called "JSX", which makes these structures easier to write. The `<div />` syntax is transformed at build time to `React.createElement('div')`. The example above is equivalent to:

```javascript
return React.createElement(
  "div",
  { className: "shopping-list" },
  React.createElement("h1" /* ... h1 children ... */),
  React.createElement("ul" /* ... ul children ... */)
);
```

JSX comes with the full power of JavaScript. You can put _any_ JavaScript expressions within braces inside JSX. Each React element is a JavaScript object that you can store in a variable or pass around in your program.

The `ShoppingList` component above only renders built-in DOM components like `<div />` and `<li />`. But you can compose and render custom React components too. For example, we can now refer to the whole shopping list by writing `<ShoppingList />`. Each React component is encapsulated and can operate independently; this allows you to build complex UIs from simple components.

---

# Inspecting the Starter Code

We have three React components in our code:

- Square
- Board
- Game

The Square component renders a single `<button>` and the Board renders 9 squares. The Game component renders a board with placeholder values which we'll modify later. There are currently no interactive components.

# Passing Data Through Props

Let's try passing some data from our Board component to our Square component.

In Board's `renderSquare` method, change the code to pass a prop called `value` to the Square:

```javascript
class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }
}
```

Change Square's `render` method to show that value by replacing `{/* TODO */}` with `{this.props.value}`:

```javascript
class Square extends React.Component {
  render() {
    return <button className="square">{this.props.value}</button>;
  }
}
```

Now you should see a number in each square in the rendered output.

This just "passed a prop" from a parent Board component to a child Square component. Passing props is how information flows in React apps, from parents to children.
