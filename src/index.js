import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {
        return (
            <button 
                className="square" 
                onClick={() => this.setState({value: 'X'})}
            >
                {this.state.value}
            </button>
        );
    }
}

class Board extends React.Component {
    /* 
        Add constructor to the Board and set the Board's 
        initial state to contain an array with 9 nulls. 
        These 9 nulls correspond to the 9 squares.
    */
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
        };
    }
    
    /*
        Using the prop passing mechanism again. We modify 
        the Board to instruct each individual Square about 
        its current value ('X', 'O', or null). We defined the 
        squares array in the Board's constructor, and we will 
        modify the Board's renderSquare method to read from it.
    */
    renderSquare(i) {
        /*
            To maintain the Board's state's privacy, we'll pass
            down a function from the Board to the Square. This
            function will get called when a Square is clicked.
            Now we're passing down two props from Board to Square:
            value and onClick. The onClick prop is a function that
            Square can call when clicked. 
        */
        return ( 
            <Square 
                value={this.state.squares[i]} 
                onClick={() => this.handleClick(i)}
            />
        
        );
    }

    render() {
        const status = 'Next player: X';

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ============================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
