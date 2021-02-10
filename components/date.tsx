import React from "react"

export default class LocalDate extends React.Component {
    props: {date: Date}
    state: {date?: string} = {}

    componentDidMount() {
        this.setState({date: this.props.date.toDateString()})
    }

    render() {
        return <span>{(this.state.date ?? this.props.date.toDateString())}</span>
    }
}