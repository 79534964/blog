const VERSION = {
    'userInfo': '1.0.0',
    'lockPassword': '1.0.0'
};

class Storage {
    constructor(version) {
        this.version = this.getLocal({key: 'version'});
        if (this.version === null) {
            this.version = version;
        } else {
            let versionKeys = Object.keys(this.version);
            Object.keys(version).forEach((e) => {
                if (!versionKeys.includes(e)) {
                    this.version[e] = version[e];
                }
            });
        }
        this.setVersion();
    }

    setVersion() {
        this.setLocal({key: 'version', value: this.version});
    }

    checkVersion(key) {
        if (key === 'version') {
            return true;
        }
        if (this.version[key] === VERSION[key]) {
            return true;
        }
        this.clearLocal(key);
        return false;
    }

    setBefore(key) {
        if (this.version[key] !== VERSION[key]) {
            this.version[key] = VERSION[key];
            this.setVersion();
        }
    }

    setSession({key, value}) {
        window.sessionStorage[key] = JSON.stringify(value);
    }

    getSession({key}) {
        if (window.sessionStorage[key]) {
            return JSON.parse(window.sessionStorage[key]);
        }
        return null;
    }

    clearSession(key = '') {
        if (key !== '') {
            window.sessionStorage[key] = null;
            return;
        }
        window.sessionStorage.clear();
    }

    setLocal({key, value}) {
        this.setBefore(key);
        window.localStorage[key] = JSON.stringify(value);
    }

    getLocal({key}) {
        if (this.checkVersion(key) && window.localStorage[key]) {
            return JSON.parse(window.localStorage[key]);
        }
        return null;
    }

    clearLocal(key = '') {
        if (key !== '') {
            window.localStorage[key] = null;
            return;
        }
        window.localStorage.clear();
    }
}

const storage = new Storage(VERSION);

export default storage;
