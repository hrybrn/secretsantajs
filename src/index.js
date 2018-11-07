import fs from 'fs';

import { sendEmail } from './gmail';
import { pairsExist, partners, themselves } from './rules';
import { shuffle } from './util';

function pairing() {
  const { people } = loadConfig();
  const unshuffled = people.slice();

  let shuffled = [];
  let permeating = true;
  
  while (permeating) {
    shuffled = shuffle(people);

    let ok = true;
    for (let i=0; i<unshuffled.length; i++) {
      if (notAllowed(unshuffled[i], shuffled[i])){
        ok = false;
      }
    }

    if (pairsExist(unshuffled, shuffled)) {
      ok = false;
    }

    if (ok) {
      permeating = false;
    }
  }

  return { unshuffled, shuffled };
}

function notAllowed(personA, personB) {
  const { banned } = loadConfig();
  return themselves(personA, personB) || partners(banned, personA, personB) || partners(banned, personB, personA);
}

function loadConfig() {
  return JSON.parse(fs.readFileSync('config.json'));
}


const result = pairing();

const gmail = loadConfig().gmail;

for (let i=0; i<result.unshuffled.length; i++) {
  sendEmail(gmail, result.unshuffled[i], result.shuffled[i]);
}
