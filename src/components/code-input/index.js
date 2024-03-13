import React from 'react'
import './style.scss'

class SingleInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: this.props.value }
    this.handleValueChange = this.handleValueChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.onClear) {
      this.setState({
        value: ''
      })
      this.props.handleClear()
    }
  }

  handleValueChange(value) {
    switch (this.props.type) {
      case 'number':
        if (value === '') this.setState({ value })
        else {
          value = value.substr(-1)
          if ('0123456789'.indexOf(value) >= 0) {
            this.setState({ value })
            this.props.onValueFilled && this.props.onValueFilled()
          }
        }
        this.props.onValueChange && this.props.onValueChange(value)
        break
      default:
        break
    }
  }

  handleKeyPress(key) {
    if (key === 8 && !this.state.value && this.props.onBackspace) this.props.onBackspace()
  }

  render() {
    const { onClickFocus } = this.props
    return (
      <input
        disabled={this.props.disabled}
        ref={(input) => {
          this.props.onRefLoad(input)
        }}
        onChange={(e) => {
          this.handleValueChange(e.target.value)
        }}
        className="input"
        value={this.state.value}
        onKeyDown={(e) => {
          this.handleKeyPress(e.keyCode)
        }}
        onClick={onClickFocus}
      />
    )
  }
}

export default class CodeInput extends React.Component {
  constructor(props) {
    super(props)
    let _state = {
      input: []
    }
    this.inputRefs = []

    for (let i = 0; i < this.props.count; i++) {
      _state.input.push({ value: '' })
      this.inputRefs.push({ ref: null })
    }
    this.state = _state

    this.onClickFocus = this.onClickFocus.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.checkInputFinish = this.checkInputFinish.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.onClear) {
      let clearInput = []
      for (let i = 0; i < this.props.count; i++) {
        clearInput.push({ value: '' })
      }
      this.setState({
        input: clearInput
      })
      this.props.handleClear()
    }
  }

  onClickFocus() {
    const indexBlankInput = this.state.input.findIndex((item) => !item.value.trim())
    if (indexBlankInput !== -1) {
      this.inputRefs[indexBlankInput].ref.focus()
    }
  }

  handleValueChange(index, value) {
    let newState = {
      ...this.state,
      input: [...this.state.input.slice(0, index), { value }, ...this.state.input.slice(index + 1)]
    }
    this.checkInputFinish(newState)
    this.setState(newState)
  }

  checkInputFinish(state) {
    const { onInputChange, onInputFinish, onInputNotFinish } = this.props

    let notFinished = state.input.some((input) => !input.value)
    const valueCode = state.input.reduce((c, v) => (c + v.value), '')
    if (onInputChange) {
      onInputChange(valueCode)
      return
    }
    if (!notFinished && onInputFinish) {
      onInputFinish(valueCode)
    }
    if (notFinished && onInputNotFinish) {
      onInputNotFinish()
    }
  }

  render() {
    const { type, onClear, handleClear, disabled } = this.props
    return (
      <div className="component-CodeInput">
        {this.state.input.map((input, index) => (
          <SingleInput
            key={index}
            type={type}
            value={input.value}
            onValueChange={(value) => {
              this.handleValueChange(index, value)
            }}
            onValueFilled={() => {
              if (index < this.inputRefs.length - 1) this.inputRefs[index + 1].ref.focus()
            }}
            onBackspace={() => {
              if (index > 0) this.inputRefs[index - 1].ref.focus()
            }}
            onRefLoad={(ref) => {
              this.inputRefs[index].ref = ref
            }}
            onClickFocus={this.onClickFocus}
            onClear={onClear}
            handleClear={handleClear}
            disabled={disabled}
          />
        ))}
      </div>
    )
  }
}
