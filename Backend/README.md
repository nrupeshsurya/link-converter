
## Installation
Create a virtual environment to install dependencies
```bash
virtualenv -p /usr/bin/python3 venv
```

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install dependencies.

```bash
pip install -r requirements.txt
```

## Usage

Create a file to store the client id and client secret

```bash
touch .env
```

Modify the .env file

```bash
client_id = <client-id>
client_secret = <client-secret>
```

Modify the env file

```bash
flask run
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)