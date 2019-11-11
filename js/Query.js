class Query {
    constructor(name, desc, endpoint, tags, body, version) {
        this._desc = desc;
        this._endpoint = endpoint;
        this._tags = tags;
        this._body = body;
        this._version = version;
        this._name = name;
    }

    get desc() {
        return this._desc;
    }

    set desc(value) {
        this._desc = value;
    }

    get endpoint() {
        return this._endpoint;
    }

    set endpoint(value) {
        this._endpoint = value;
    }

    get tags() {
        return this._tags;
    }

    set tags(value) {
        this._tags = value;
    }

    get body() {
        return this._body;
    }

    set body(value) {
        this._body = value;
    }

    get version() {
        return this._version;
    }

    set version(value) {
        this._version = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }
}