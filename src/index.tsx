import {createConnection, getRepository} from "typeorm";
import * as ReactDOM from "react-dom";
import * as React from "react";
import "reflect-metadata";
import Hello from "./entities/Hello";
import HelloComponent from "./component/HelloComponent";

createConnection({
    type: "sqljs",
    synchronize: true,
    autoSave: true,
    entities: [Hello],
    logging: true,
    logger: "advanced-console",
    location: "core-db"
})
    .then(() => {
        const repository = getRepository(Hello);
        const hello = new Hello;
        hello.firstname = 'john';
        hello.lastname = 'doe';
        return repository.save(hello);
    })
    .then(() => {
        ReactDOM.render(<HelloComponent id={1} />, document.getElementById('app'));
    });
