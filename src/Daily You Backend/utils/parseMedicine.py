import datefinder
from nltk.tag import pos_tag
import datetime
import sys


def get_end_date(string):
    matches = [match for match in datefinder.find_dates(string)]
    if matches:
        return matches[0]
    return datetime.datetime.now() + datetime.timedelta(days=7)


def get_medicine_name(string):
    tagged_sent = pos_tag(string.split())
    propernouns = [word for word, pos in tagged_sent if pos == "NNP"]
    if propernouns:
        return propernouns[0]
    return "Medicine Name Not Found"


def get_time(string):
    dates = []
    if "twice" in string:
        dates.append("11:00")
        dates.append("22:00")
    if "thrice" in string:
        dates.append("08:00")
        dates.append("15:00")
        dates.append("22:00")
    if "once" in string:
        dates.append("22:00")
    if "before" in string:
        if "lunch" in string:
            dates.append("12:00")
        if "breakfast" in string:
            dates.append("08:00")
        if "dinner" in string:
            dates.append("21:00")
    if "after" in string:
        if "lunch" in string:
            dates.append("14:00")
        if "breakfast" in string:
            dates.append("10:00")
        if "dinner" in string:
            dates.append("23:00")
    return list(set(dates))


def parseMedicine(string):
    return get_end_date(string), get_medicine_name(string), get_time(string)


info = parseMedicine(sys.argv[1])
print(info[0].isoformat())
print(info[1])
for itr, time in enumerate(info[2]):
    if itr == len(info[2]) - 1:
        print(time)
    else:
        print(time, end=",")
print(sys.argv[1])
# sys.stdout.flush()
