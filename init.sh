#!/bin/sh

ACCESS_TOKEN=`cat ./page_access_token`
THREAD_SETTING_URI="https://graph.facebook.com/v2.6/me/thread_settings?access_token=${ACCESS_TOKEN}"

curl -XPOST  -H "Content-Type: application/json" -d @conf/greeting-setting.json "${THREAD_SETTING_URI}"

curl -XPOST  -H "Content-Type: application/json" -d @conf/welcome-setting.json "${THREAD_SETTING_URI}"
