const fs = require('fs');
const path = require('path');
const stylus = require('stylus');

const INPUT = path.join(__dirname, '../assets/css/style.styl');
const OUTPUT = path.join(__dirname, '../assets/css/style.css');
const isOnce = process.argv.includes('--once');

function compile() {
	return new Promise((resolve, reject) => {
		const src = fs.readFileSync(INPUT, 'utf8');

		stylus(src)
			.set('filename', INPUT)
			.render((err, css) => {
				if (err) {
					reject(err);
					return;
				}

				if (fs.existsSync(OUTPUT)) {
					const existing = fs.readFileSync(OUTPUT, 'utf8');

					if (existing === css) {
						resolve({ written: false });
						return;
					}
				}

				fs.writeFileSync(OUTPUT, css);
				resolve({ written: true });
			});
	});
}

function logError(err) {
	console.error('\n[stylus] Compilation failed\n');
	console.error(err.message);
	if (!String(err.message).trim().endsWith('\n')) {
		console.error('');
	}
}

function logSuccess() {
	const relativeOutput = path.relative(process.cwd(), OUTPUT);
	console.log(`[stylus] compiled ${relativeOutput}`);
}

function run() {
	compile()
		.then(({ written }) => {
			if (written) {
				logSuccess();
			}
		})
		.catch((err) => {
			logError(err);

			if (isOnce) {
				process.exit(1);
			}
		});
}

run();

if (!isOnce) {
	let timer;

	fs.watch(INPUT, () => {
		clearTimeout(timer);
		timer = setTimeout(run, 100);
	});

	console.log(`[stylus] watching ${path.relative(process.cwd(), INPUT)}`);
}
