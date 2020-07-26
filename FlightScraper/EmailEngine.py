import os
import smtplib
from email.message import EmailMessage


def send_email(email, firstName,  lastName, targetPrice, destination, actualPrice, URL):
    EMAIL_ADDRESS = os.environ.get('EMAIL_USER')
    EMAIL_PASSWORD = os.environ.get('EMAIL_PASS')
    contacts = [email]
    msg = EmailMessage()
    msg['Subject'] = 'SkyX: Price Alert Notification'
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = email
    msg.set_content("""\
    <!DOCTYPE html>
    <html>
        <body>
            <h1>Hello, {firstName} {lastName}</h1>
            <h4>Your price alert set at ${targetPrice} to {destination} has been achieved. In fact, we found a deal at 
                ${actualPrice}!</h4>
            <h4>Please purchase your flight ticket today using this link below:</h4>
            <h4>{URL}</h4>
            <h4>Regards, </h4>
            <h4>SkyX Team</h4>
        </body>
    </html>
    """.format(firstName=firstName, lastName=lastName, targetPrice=targetPrice, destination=destination, actualPrice=actualPrice, URL=URL), subtype='html')
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
        smtp.login('skyxnotif@gmail.com', 'orbitalskyx')
        smtp.send_message(msg)
