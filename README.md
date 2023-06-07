# KWWarfareUnits
A tool for quickly making pretty Kingdoms and Warfare unit cards


# Installing
Install Python 3 on the machine of your choice, https://www.python.org/getit/ 
On windows, it's recommended to use MINGW64; https://git-scm.com/download/win 
install pipenv `pip install pipenv` or `python -m pip install pipenv`
`git clone git@github.com:bleehu/KWWarfareUnits.git`
`cd KWWarfareUnits`
`pipnenv install` (developers should use `pipenv install -d`)

# using

`pipenv run export FLASK_APP='kw_units_app.py'`
`pipenv run flask run`

# update
`git pull`
`pipenv run pip show KingdomsAndWarfare`
`pipenv install KingdomsAndWarfare --upgrade`
