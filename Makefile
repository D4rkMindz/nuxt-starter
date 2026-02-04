docker:
	@docker compose up --build -d

certbot:
	@certbot --dns-cloudflare-credentials /var/certbot/conf.ini --preferred-challenges dns -d *.d4rkmindz.ch -d d4rkmindz.ch -d *.darkmindz.ch -d darkmindz.ch