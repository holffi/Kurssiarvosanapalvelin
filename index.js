import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import path from 'path';
import kurssiarvosanat from './kurssiarvosanat.json' assert { type: 'json' };
import { assert } from 'console';

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get('/arvosanat', (req, res) => {
  res.json(kurssiarvosanat);
});

app.post('/arvosanat', (req, res) => {
  const opiskelija = req.body.opiskelija;
  const kurssi = req.body.kurssi;
  const arvosana = req.body.arvosana;
  const kurssiarvosana = {
    kurssi,
    opiskelija,
    arvosana,
  };

  kurssiarvosanat.push(kurssiarvosana);
  fs.writeFileSync('./kurssiarvosanat.json', JSON.stringify(kurssiarvosanat));
  res.json(kurssiarvosanat);
});

app.get('/kurssit/:nimi', (req, res) => {
  const kurssi = req.params.nimi;
  const tulos = kurssiarvosanat.filter((kurssiarvosana) => {
    if (kurssiarvosana.kurssi == kurssi) {
      return true;
    }
  });

  res.json(tulos);
});

app.get('/opiskelijat/:nimi', (req, res) => {
  const opiskelija = req.params.nimi;
  const tulos = kurssiarvosanat.filter((kurssiarvosana) => {
    if (kurssiarvosana.opiskelija == opiskelija) {
      return true;
    }
  });

  res.json(tulos);
});

app.get('/arvosanat/:opiskelija/:kurssi', (req, res) => {
  const opiskelija = req.params.opiskelija;
  const kurssi = req.params.kurssi;
  const tulos = kurssiarvosanat.filter((kurssiarvosana) => {
    if (
      kurssiarvosana.opiskelija == opiskelija &&
      kurssiarvosana.kurssi == kurssi
    ) {
      return true;
    }
  });

  res.json(tulos);
});

app.listen(3000, 'localhost', () => {
  console.log('Kurssiarvosana palvelin kuuntelee');
});
