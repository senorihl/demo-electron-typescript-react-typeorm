import * as React from "react";
import * as PropTypes from "prop-types";
import {getRepository} from "typeorm";
import Hello from "../entities/Hello";

interface HelloProps {
    id: number
}

export default class HelloComponent extends React.Component<HelloProps> {
    static propTypes = {
        id: PropTypes.number.isRequired
    };

    state: any = {
        firstname: '', lastname: ''
    };

    async componentDidMount() {
        const entity = await getRepository(Hello).findOne({ id: this.props.id });
        this.setState({
            firstname: entity.firstname,
            lastname: entity.lastname,
        });
    }

    render() {
        return (<div>Hello {this.state.firstname} {this.state.lastname}</div>);
    }
};
