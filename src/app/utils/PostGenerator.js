/**
 * Fala galerinha!
 * Esta arquivo é o mais importante da aplicação,
 * aqui é onde o post é gerado. 
 * Utilizei o JIMP para gerar a imagem.
 */

import Jimp from 'jimp';

export default async function postGenerate(img, title, font) {
	const image = await Jimp.read(img);
	const bt = await Jimp.read('./src/app/img/bt.png');
	

	const w = image.getWidth();
	const wM = image.getWidth() / 2;
	const h = image.getHeight();
	const hM = image.getHeight() / 2;

	if (h < 600 || w < 600) {
		if (h < w) {
			image.crop(hM - h / 2, 0, h, h);
		} else {
			image.crop(wM - w / 2, 0, w, w);
		}
	} else {
		image.crop(wM - 300, hM - 300, 600, 600);
	}

	image.resize(600, 600);


	image.composite(bt, 0, 400, {
		mode: Jimp.BLEND_MULTIPLY,
		opacitySource: 1,
		opacityDest: 1,
	});

	const fontText = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);

	const fontMension = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);

	const titleCorrected = title.replace(/"/g, "'");

	image.print(fontMension, 5, 565, `fonte: ${font}`, 200);

	image.print(
		fontText,
		50,
		430,
		{
			text: titleCorrected,
			alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
			alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
		},
		500,
		130
	);

	const name = new Date().toISOString();
	const path = `./tmp/uploads/${name}.${image.getExtension()}`;

	if (image.write(path)) {
		return `${name}.${image.getExtension()}`;
	}
	return false;
}
