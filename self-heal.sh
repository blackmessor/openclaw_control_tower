#!/bin/bash
cd /Users/nicolasgodefroy/openclaw_control_tower
if ! curl -f -s http://localhost:3000/ > /dev/null; then
  pm2 restart dashboard
  echo "$(date): Restarted dashboard" >> heal.log
fi