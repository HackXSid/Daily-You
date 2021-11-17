# Daily-You

Demo : https://github.com/HackXSid/Daily-You

### Installation

1. ```git clone git@github.com:HackXSid/Daily-You.git```
2. ```cd Daily You```
3. cd ```src/```

#### Terminal 1 ( Backend )

1. cd ```Daily You Backend```
2. Create appropriate ```.env``` file from ```example.env``` in ```src/Daily You Backend```
3. Create a FCM service and store the secret key here
4. ```npm run dev```

#### Terminal 2 ( App )

1. cd ```Daily You App```
2. ```react-native run-android```

#### Terminal 3 ( Web )

1. cd ```Daily You Doctor```
2. ```npm start```

### Problem Statement

#### Reluctant to spend time manually entering reminders
  Most applications available on Play Store / App Store, require the user to manually enter their medication information and set the reminders which discourage the younger and the older generation from using them.
#### Users prefer some visual indication for medication progress
  Most applications are simple reminder app that notifies them to regularly take their medications. However, users want to visualise their progress, any medication misses, on-time medications to give them some sort of validation.
#### Need to use separate application to track refill dates, guide regarding how to use a medicine, etc.
  Missing your refill dates can put you in an uncanny situation more so if one’s life depends on the medication. Moreover, information related to prohibited foods, how to use a medication requires intensive searching on Google.
#### Older generation require someone to oversee their medicine intake
  Old people can easily miss any life-saving medication. Thus it is essential for someone to oversee such situations.
  
### Solution

1. A native application capable of running on Android, IOS, WearOS ( Android Watch ) and Web.
2. Allows Doctors to issue E-Prescriptions to an individual and using NLP parse the medication information to automatically add medication reminders for the patients ( Eliminates the need of manual entry ).
3. Visualise your progress, get refill reminders, get information related to the medicine all from one app.
4. Allows Doctors and Emergency Contacts to view one’s medication statistics, adherence rate and progress.
5. Useful for insurance companies to gauge a person’s medical adherence.

### Impact

1. Simple UI/UX with self-explanatory components catering to people of all ages. Provides visual indications of medication progress, adherence rate, improvement areas using AI and a third-person ( friend, family, etc. ) to monitor you.
2. Provides E-Prescription Services - prevents forgery, wastage of paper, prescription abuse, enables automatic medicine reminder addition ( removing manual work ).
3. Integration with WearOS ( Android Watch ) to send timely notifications. Use Android Widget to view that day’s medication without opening the app.

### USP
1. Don’t spend time manually adding medication reminders which also increases your chance of human error ( wrong dosage, timings, etc. ). Using Daily You, medication reminders would automatically be added by parsing your prescription.
2. Integration with wearables, widgets ensure you don’t need to open your app to get medication reminders.
3. A comprehensive medicine catalog ensures correct dosage, pill quantity, refill dates, prohibited foods, pill image and how to use medicine devices ( inhaler, syringes, etc. ).
