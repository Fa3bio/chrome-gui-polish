export const OFFENSIVE_KEYWORDS = [
  // --- Autolesionismo / Violenza / Morte ---
  "morir", "mourir", "sterben", "die", "kill", "kys",
  "suicid", "k1ll", "autolesion", "selfharm",
  "morte", "muerte", "death", "tod", "uccid", "ammazz", "assassin", "omicid", "omicidi", "homicid",
  "mato", "tue", "strangol", "tortur", "massacr", "bruci",
  "sgozz", "decapit", "squart", "dismember", "behead",
  "gore", "violenc", "sangue", "blood", "bloody",

  // --- Contenuti Etnici / Razzisti / Discriminatori ---
  "nazi", "n4zi", "hitler", "h1tler", "auschwitz", "siegheil", "heilhitler",
  "kkk", "kluxklan", "razzist", "razza", "razzial",
  "nigga", "n1gga", "n1gger", "negro", "negroes", "nigger", "blackie",
  "jew", "ebreo", "jude", "giudeo", "sionist",
  "zingaro", "gipsy", "romeno", "rumeno", "albanes", "marocchin", "arabo", "cines", "terrone", "polentone",
  "islamofob", "xenofob",

  // --- Contenuti Omofobi / Transfobici / Misogini ---
  "faggot", "froci", "finocchi", "gay", "omo",
  "trans", "tranny", "travest", "ermafrodit",
  "puttan", "bitch", "whore", "slut", "cagna", "bagascia", "troia", "zoccol", "sgualdrina", "mignotta", "prostitut",
  "misogin", "sessist",

  // --- Contenuti Sessuali Espliciti / Pedofilia / Incesto ---
  "cazzo", "dick", "pene", "penis", "minkia", "minchia", "verga", "fava", "pisell",
  "figa", "vagina", "passer", "pussy", "fica", "patata", "topa", "vulva",
  "sborr", "cum", "sborrata", "ejaculat",
  "pompin", "blowjob", "fellatio", "leccaculo", "cunnilingus", "anilingus",
  "scop", "fott", "fottere", "threesome", "gangbang", "orgia", "orgy",
  "incest", "pedof", "ped0f", "loli", "lolita", "childporn", "minorenne", "bambina", "bambino", "ragazzina", "teenporn",
  "stupr", "violenzasessual", "rape", "rapist", "molest", "abusosessual",
  "hardcore", "hentai", "porno", "porn", "sesso", "sex", "erotico", "erotic",
  "deepfake", "revengeporn",

  // --- Droghe / Alcol / Dipendenze ---
  "droga", "cocain", "coca", "eroin", "mdma", "ecstasy", "meth", "crystalmeth", "marijuan", "cannabi", "fumo", "spinell",
  "alcol", "alcool", "ubriaco", "sbronzo", "sbronza", "sbornia",
  "crack", "ketamin", "lsd",

  // --- Terrorismo / Estremismo ---
  "terror", "bomber", "jihad", "isis", "alqaeda", "taliban",
  "estremist", "anarchico", "fascist", "comunist",

  // --- Insulti Generali ---
  "idiota", "stupido", "cretino", "imbecille", "deficiente", "ritardato", "scemo", "coglione", "bastardo", "stronzo",
  "merda", "shit", "fuck", "cunt", "asshole", "prick", "douchebag",
  "buffone", "clown", "pagliaccio",
  "handicapp", "disabil",
  "coatto", "tamarro",

  // --- Minacce / Bullismo ---
  "tiuccido", "ticaco", "ammazz", "spacc", "picchio", "botte",
  "bullismo", "cyberbullismo", "stalker", "stalking",
];

export function normalizeUsername(name: string): string {
  if (!name) return '';
  return name.toLowerCase()
    .replace(/[._\-~`'"]/g, '')
    .replace(/[1!¡il|ł]/g, 'i')
    .replace(/[0oøòóōöôõœ]/g, 'o')
    .replace(/[3e€èéêëě]/g, 'e')
    .replace(/[4a@àáâãäåæ]/g, 'a')
    .replace(/[5s$§şš]/g, 's')
    .replace(/[7t†]/g, 't')
    .replace(/[8bß]/g, 'b')
    .replace(/[6g]/g, 'g')
    .replace(/[2zžźż]/g, 'z')
    .replace(/[9q]/g, 'q')
    .replace(/[v]/g, 'u')
    .replace(/[w]/g, 'vv')
    .replace(/[y]/g, 'i')
    .replace(/ck/g, 'k')
    .replace(/ph/g, 'f')
    .replace(/gh/g, 'g')
    .replace(/ch/g, 'k')
    .replace(/\s+/g, '');
}

export function checkUsernameIsSuspicious(username: string): boolean {
  const normalized = normalizeUsername(username);
  return OFFENSIVE_KEYWORDS.some(keyword => normalized.includes(keyword));
}
