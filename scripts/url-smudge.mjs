#!/usr/bin/env -S node --no-warnings

import { readFileSync } from 'fs';
import urls from '../.urls.json' assert { type: 'json' };

// Get file info from stdin
const safeRead = (count = 0) => {
	try {
		return readFileSync(process.stdin.fd, 'utf-8');
	} catch (ex) {
		if (count > 10) {
			throw ex;
		}
		return safeRead(count + 1);
	}
};

// Get file info from stdin
let data = safeRead();

// Replace data
Object.keys(urls).forEach((key) => {
	while (data.indexOf(key) !== -1) {
		data = data.replace(key, urls[key]);
	}
});

// Output to stdout
process.stdout.write(data);