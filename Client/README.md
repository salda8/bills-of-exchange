# Směnky Client

Vaším úkolem je dokončit vytvořit klientskou aplikaci. Pro spouštění použijte zde připravený webpack dev server nebo obdobný nástroj (neřešte BE část klientské aplikace).

Klientská aplikace musí umožnit následující:

- Zvolit si ze seznamu danou osobu (stránkovaně) a zobrazit si její detail
- Zvolit si ze seznamu danou směnku (stránkovaně) a zobrazit si její detail
- Na detailu osoby zobrazit všechny směnky, které vystavila a všechny směnky které má právě u sebe (tj. kdy je posledním beneficientem)
- Na detailu směnky zobrazit kompletní řad a jejího vystavitele
- Z detailu osoby přejít na detail směnky
- Z detailu směnky přejít na detail osoby

Aplikace by měl být schopná handlovat vyjímky vyhozené API serverem aniž by došlo k jejím pádu.

Na grafickém zpracování nezáleží. Použijte svojí oblíbenou knihovnu, vlastní stylování, nebo použite nenastylované elementy. Pokud řešíte pouze klientskou část s placeholder daty, záleží i na grafickém zpracování.

_Bonusové body:_

- Použít TypeScript
- Použít React
- Pokrýt kód unit testy
- Zajistit aby při opuštění a návratu mohl uživatel pokračovat tam, kde skončil
