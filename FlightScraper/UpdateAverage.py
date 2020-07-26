import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import datetime

cred = credentials.Certificate('firebase-sdk.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

def findNewAverage(current_avg, new_price, num):
    if num == 13:
        # new value
        return new_price
    else:
        units = 13 - num
        total = current_avg * units + new_price
        return total / (units + 1)

def updateAverage(city, scrape_start):
    flight_date = scrape_start
    updated_avg_dict = {}
    docs = db.collection('flight_price_' + city)
    avg_ref = db.collection('flight_price_' + city).document('Prices')
    avg_dict = avg_ref.get().to_dict().get('Average Prices')   
    # writing average price data onto firebase taking into acccount the 14 days scraped
    for i in range(14):
        # reference to the price location for latest scrape
        data = docs.document(flight_date.strftime("%Y-%m-%d")).collection(current_date.strftime("%Y-%m-%d")).document("Data")
        price = data.get({u'Price'})
        price_dict = price.to_dict()
        price_str = price_dict.get('Price')
        # retrieve today's price
        price_num = int(price_str[1:])
        if i == 13:
            # only 1 entry
            updated_avg_dict[flight_date.strftime("%Y-%m-%d")] = price_num
        else:
            # add today's price into current_avg
            current_avg = avg_dict[flight_date.strftime("%Y-%m-%d")]
            new_avg = findNewAverage(current_avg, price_num, i)
            updated_avg_dict[flight_date.strftime("%Y-%m-%d")] = new_avg
        flight_date = flight_date + datetime.timedelta(1) 

    dataset = {
        u'Average Prices': updated_avg_dict
    }
    # upload updated averages onto Firebase
    avg_ref.set(dataset, merge = True)

def updateHighest(city, scrape_start):
    flight_date = scrape_start
    updated_high_dict = {}
    docs = db.collection('flight_price_' + city)
    high_ref = db.collection('flight_price_' + city).document('Prices')
    high_dict = high_ref.get().to_dict().get('Highest Prices')  
    # writing highest price data onto firebase taking into acccount the 14 days scraped
    for i in range(14):
        # reference to the price location for latest scrape
        data = docs.document(flight_date.strftime("%Y-%m-%d")).collection(current_date.strftime("%Y-%m-%d")).document("Data")
        price = data.get({u'Price'})
        price_dict = price.to_dict()
        price_str = price_dict.get('Price')
        # retrieve today's price
        price_num = int(price_str[1:])
        if i == 13:
            # only 1 entry
            updated_high_dict[flight_date.strftime("%Y-%m-%d")] = price_num
        else:
            # compare today's price with current high
            current_high = high_dict[flight_date.strftime("%Y-%m-%d")]
            if price_num > current_high:
                updated_high_dict[flight_date.strftime("%Y-%m-%d")] = price_num
            else:
                updated_high_dict[flight_date.strftime("%Y-%m-%d")] = current_high
        flight_date = flight_date + datetime.timedelta(1)  

    dataset = {
        u'Highest Prices': updated_high_dict
    }
    # upload updated highest onto Firebase
    high_ref.set(dataset, merge = True)

def updateLowest(city, scrape_start):
    flight_date = scrape_start
    updated_low_dict = {}
    docs = db.collection('flight_price_' + city)
    low_ref = db.collection('flight_price_' + city).document('Prices')
    low_dict = low_ref.get().to_dict().get('Lowest Prices')  
    # writing highest price data onto firebase taking into acccount the 14 days scraped
    for i in range(14):
        # reference to the price location for latest scrape
        data = docs.document(flight_date.strftime("%Y-%m-%d")).collection(current_date.strftime("%Y-%m-%d")).document("Data")
        price = data.get({u'Price'})
        price_dict = price.to_dict()
        price_str = price_dict.get('Price')
        # retrieve today's price
        price_num = int(price_str[1:])
        if i == 13:
            # only 1 entry
            updated_low_dict[flight_date.strftime("%Y-%m-%d")] = price_num
        else:
            # compare today's price with current high
            current_low = low_dict[flight_date.strftime("%Y-%m-%d")]
            if price_num < current_low:
                updated_low_dict[flight_date.strftime("%Y-%m-%d")] = price_num
            else:
                updated_low_dict[flight_date.strftime("%Y-%m-%d")] = current_low
        flight_date = flight_date + datetime.timedelta(1)  

    dataset = {
        u'Lowest Prices': updated_low_dict
    }
    # upload updated lowest onto Firebase
    low_ref.set(dataset, merge = True)

def updateAllTimeAverage(city):
    docs = db.collection('flight_price_' + city)
    avg_ref = db.collection('flight_price_' + city).document('Prices')
    avg_dict = avg_ref.get().to_dict().get('Average Prices')   
    all_time_avg = sum(avg_dict.values()) / len(avg_dict)
    dataset = {
        u'All Time Average': all_time_avg
    }
    # upload updated all time average onto Firebase
    avg_ref.set(dataset, merge = True)

def updateAllTimeHigh(city):
    docs = db.collection('flight_price_' + city)
    high_ref = db.collection('flight_price_' + city).document('Prices')
    high_dict = high_ref.get().to_dict().get('Highest Prices')
    all_time_high = max(high_dict.values())
    print(all_time_high)
    dataset = {
        u'All Time High': all_time_high
    }
    # upload updated all time average onto Firebase
    high_ref.set(dataset, merge = True)

def updateAllTimeLow(city):
    docs = db.collection('flight_price_' + city)
    low_ref = db.collection('flight_price_' + city).document('Prices')
    low_dict = low_ref.get().to_dict().get('Lowest Prices')
    all_time_low = min(low_dict.values())
    print(all_time_low)
    dataset = {
        u'All Time Low': all_time_low
    }
    # upload updated all time average onto Firebase
    low_ref.set(dataset, merge = True)

def updateMonthlyAvg(city):
    docs = db.collection('flight_price_' + city)
    avg_ref = db.collection('flight_price_' + city).document('Prices')
    avg_dict = avg_ref.get().to_dict().get('Average Prices')
    if (datetime.date.today().month < 10):
        this_month = str(datetime.date.today().year) + "-0" + str(datetime.date.today().month)
    else:
        this_month = str(datetime.date.today().year) + "-" + str(datetime.date.today().month)
    filtered_dict = {}
    for key in avg_dict.keys():
        if this_month in key:
            filtered_dict[key] = avg_dict[key]
    monthly_avg = sum(filtered_dict.values()) / len(filtered_dict)
    dataset = {
        u'Monthly Average': monthly_avg
    }
    # upload updated all time average onto Firebase
    avg_ref.set(dataset, merge = True)

def updateMonthlyHigh(city):
    docs = db.collection('flight_price_' + city)
    high_ref = db.collection('flight_price_' + city).document('Prices')
    high_dict = high_ref.get().to_dict().get('Highest Prices')
    if (datetime.date.today().month < 10):
        this_month = str(datetime.date.today().year) + "-0" + str(datetime.date.today().month)
    else:
        this_month = str(datetime.date.today().year) + "-" + str(datetime.date.today().month)
    filtered_dict = {}
    for key in high_dict.keys():
        if this_month in key:
            filtered_dict[key] = high_dict[key]
    monthly_high = max(filtered_dict.values())
    dataset = {
        u'Monthly High': monthly_high
    }
    # upload updated all time average onto Firebase
    high_ref.set(dataset, merge = True)

def updateMonthlyLow(city):
    docs = db.collection('flight_price_' + city)
    low_ref = db.collection('flight_price_' + city).document('Prices')
    low_dict = low_ref.get().to_dict().get('Lowest Prices')
    if (datetime.date.today().month < 10):
        this_month = str(datetime.date.today().year) + "-0" + str(datetime.date.today().month)
    else:
        this_month = str(datetime.date.today().year) + "-" + str(datetime.date.today().month)
    filtered_dict = {}
    for key in low_dict.keys():
        if this_month in key:
            filtered_dict[key] = low_dict[key]
    monthly_low = min(filtered_dict.values())
    dataset = {
        u'Monthly Low': monthly_low
    }
    # upload updated all time average onto Firebase
    low_ref.set(dataset, merge = True)


def updateUpwardVolatility(city):
    ref = db.collection('flight_price_' + city).document('Prices')
    ref_dict = ref.get().to_dict()
    avg = ref_dict["All Time Average"]
    high = ref_dict["All Time High"]
    upwardVol = ((high - avg) / avg) * 100
    print(upwardVol)
    dataset = {
        u'Upward Volatility': upwardVol
    }
    # upload upward volatility onto Firebase
    ref.set(dataset, merge=True)


def updateDownwardVolatility(city):
    ref = db.collection('flight_price_' + city).document('Prices')
    ref_dict = ref.get().to_dict()
    avg = ref_dict["All Time Average"]
    low = ref_dict["All Time Low"]
    downwardVol = ((avg - low) / avg) * 100
    print(downwardVol)
    dataset = {
        u'Downward Volatility': downwardVol
    }
    # upload downward volatility onto Firebase
    ref.set(dataset, merge=True)

current_date = datetime.date.today()
scrape_start = current_date + datetime.timedelta(30)

updateAverage("DPS", scrape_start)
updateHighest("DPS", scrape_start)
updateLowest("DPS", scrape_start)
updateAllTimeAverage("DPS")
updateAllTimeHigh("DPS")
updateAllTimeLow("DPS")
updateUpwardVolatility("DPS")
updateDownwardVolatility("DPS")

updateAverage("HKG", scrape_start)
updateHighest("HKG", scrape_start)
updateLowest("HKG", scrape_start)
updateAllTimeAverage("HKG")
updateAllTimeHigh("HKG")
updateAllTimeLow("HKG")
updateUpwardVolatility("HKG")
updateDownwardVolatility("HKG")

updateAverage("KUL", scrape_start)
updateHighest("KUL", scrape_start)
updateLowest("KUL", scrape_start)
updateAllTimeAverage("KUL")
updateAllTimeHigh("KUL")
updateAllTimeLow("KUL")
updateUpwardVolatility("KUL")
updateDownwardVolatility("KUL")

updateAverage("LON", scrape_start)
updateHighest("LON", scrape_start)
updateLowest("LON", scrape_start)
updateAllTimeAverage("LON")
updateAllTimeHigh("LON")
updateAllTimeLow("LON")
updateUpwardVolatility("LON")
updateDownwardVolatility("LON")

updateAverage("TYO", scrape_start)
updateHighest("TYO", scrape_start)
updateLowest("TYO", scrape_start)
updateAllTimeAverage("TYO")
updateAllTimeHigh("TYO")
updateAllTimeLow("TYO")
updateUpwardVolatility("TYO")
updateDownwardVolatility("TYO")

#Update monthly high at the start of the month
if(current_date.day == 1):
    print("Updating monthly...")
    updateMonthlyAvg("DPS")
    updateMonthlyHigh("DPS")
    updateMonthlyLow("DPS")
    updateMonthlyAvg("HKG")
    updateMonthlyHigh("HKG")
    updateMonthlyLow("HKG")
    updateMonthlyAvg("KUL")
    updateMonthlyHigh("KUL")
    updateMonthlyLow("KUL")
    updateMonthlyAvg("LON")
    updateMonthlyHigh("LON")
    updateMonthlyLow("LON")
    updateMonthlyAvg("TYO")
    updateMonthlyHigh("TYO")
    updateMonthlyLow("TYO")