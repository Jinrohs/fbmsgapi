#!/bin/sh

ACCESS_TOKEN=`cat ./page-access-token`
THREAD_SETTING_URI="https://graph.facebook.com/v2.6/me/thread_settings?access_token=${ACCESS_TOKEN}"

curl -XPOST  -H "Content-Type: application/json" -d @conf/greeting_setting.json "${THREAD_SETTING_URI}"