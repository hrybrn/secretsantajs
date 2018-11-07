export function themselves(personA, personB) {
  return personA.name === personB.name;
}

export function partners(banned, personA, personB) {
  return banned[personA.name] === personB.name;
}

export function pairsExist(unshuffled, shuffled) {
  for (let i=0; i<unshuffled.length; i++){
    const pairA = { personA: unshuffled[i], personB: shuffled[i] };
    const pairB = { personA: pairA.personB, personB: shuffled[unshuffled.findIndex((person) => person.name === pairA.personB.name)] };

    if (pairA.personA.name === pairB.personB.name) {
      return true;
    }
  }

  return false;
}
