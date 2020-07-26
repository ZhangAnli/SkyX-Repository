import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import datetime
import EmailEngine

cred = credentials.Certificate('firebase-sdk.json')
firebase_admin.initialize_app(cred)
db = firestore.client()
current_date = datetime.date.today()
scrape_start = current_date + datetime.timedelta(30)
delete_date = current_date + datetime.timedelta(29)


def country_picker(country):
    if country == "DPS":
        return "Denpasar, Bali"
    elif country == "KUL":
        return "Kuala Lumpur, Malaysia"
    elif country == "HKG":
        return "Hong Kong"
    elif country == "TYO":
        return "Tokyo, Japan"
    else:
        return "London, United Kingdom"


def price_alert(country):
    dps_ref = db.collection("Price Alerts").document(country)
    # loop through the 14 days in Firebase
    loop_date = scrape_start
    for x in range(14):
        my_dict = dps_ref.get().to_dict().get(str(loop_date))
        scrape_ref = db.collection(u'flight_price_' + country).document(str(loop_date)) \
            .collection(str(current_date)).document('Data')
        scrape_dict = scrape_ref.get().to_dict()
        scrape_price = int(scrape_dict["Price"][1:])
        scrape_url = scrape_dict["URL"]
        settled_queries = []
        city = country_picker(country)
        # compare alert price with scrape price if there are queries
        if my_dict is not None:
            for key in my_dict.keys():
                user_alert_price = my_dict[key]["AlertPrice"]
                first_name = my_dict[key]["FirstName"]
                last_name = my_dict[key]["LastName"]
                if scrape_price <= user_alert_price:
                    # SEND EMAIL TO THIS USER (KEY)
                    EmailEngine.send_email(key, first_name, last_name, str(user_alert_price),
                                           city, str(scrape_price), scrape_url)
                    # remove user from Firebase once email sent
                    settled_queries.append(key)
        for query in settled_queries:
            my_dict.pop(query, None)
        if settled_queries:
            # remove settled queries from firebase
            dps_ref.update({
                str(loop_date): my_dict
            })
        loop_date = loop_date + datetime.timedelta(1)

    # Delete the previous day price alerts as we are not going to scrape this day anymore
    dps_ref.update({
        str(delete_date): firestore.DELETE_FIELD
    })


price_alert("DPS")
price_alert("KUL")
price_alert("HKG")
price_alert("LON")
price_alert("TYO")
print("Price Alert Done")