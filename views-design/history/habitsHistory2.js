var habitColours = { 	inquisitive: "#edcf48",
						collaborative: "#f95525",
						persistent: "#39a8d5",
						disciplined: "#86ad3e",
						imaginative: "#fa078a"
					};
var allHabits = ["inquisitive", "collaborative", "persistent", "disciplined", "imaginative"];
var allHabitsNames = ["Inquisitive", "Collaborative", "Persistent", "Disciplined", "Imaginative"];

var habitsData1 = [{"habit":"persistent","date":"2013-03-06T05:42:00.000Z","value":0.8891579899936914},{"habit":"disciplined","date":"2013-02-03T07:04:00.000Z","value":0.617173885460943},{"habit":"inquisitive","date":"2013-03-06T19:36:00.000Z","value":0.33400854258798063},{"habit":"inquisitive","date":"2013-04-04T23:24:00.000Z","value":0.6988055258989334},{"habit":"persistent","date":"2013-03-02T03:12:00.000Z","value":0.552448196336627},{"habit":"persistent","date":"2013-03-26T23:28:00.000Z","value":0.49773836228996515},{"habit":"persistent","date":"2013-02-09T21:07:00.000Z","value":0.43500189832411706},{"habit":"disciplined","date":"2013-01-10T11:28:00.000Z","value":0.7932892423123121},{"habit":"imaginative","date":"2013-04-04T08:20:00.000Z","value":0.5591871708165854},{"habit":"collaborative","date":"2013-04-05T18:46:00.000Z","value":0.41519028693437576},{"habit":"collaborative","date":"2013-02-21T01:34:00.000Z","value":0.12440329720266163},{"habit":"inquisitive","date":"2013-02-06T13:51:00.000Z","value":0.10657426877878606},{"habit":"persistent","date":"2013-01-15T10:20:00.000Z","value":0.7235701049212366},{"habit":"imaginative","date":"2013-02-27T18:27:00.000Z","value":0.6287184932734817},{"habit":"collaborative","date":"2013-03-11T15:39:00.000Z","value":0.7299686530604959},{"habit":"collaborative","date":"2013-03-05T16:11:00.000Z","value":0.312688393285498},{"habit":"disciplined","date":"2013-02-21T14:48:00.000Z","value":0.9314355968963355},{"habit":"collaborative","date":"2013-02-19T02:48:00.000Z","value":0.8273651804775},{"habit":"persistent","date":"2013-02-09T08:01:00.000Z","value":0.786650390131399},{"habit":"persistent","date":"2013-01-22T07:17:00.000Z","value":0.32322374801151454},{"habit":"inquisitive","date":"2013-02-17T23:25:00.000Z","value":0.36301342071965337},{"habit":"disciplined","date":"2013-04-30T18:36:00.000Z","value":0.9645579948555678},{"habit":"inquisitive","date":"2013-03-26T23:54:00.000Z","value":0.4950520135462284},{"habit":"collaborative","date":"2013-03-27T11:13:00.000Z","value":0.45826554601080716},{"habit":"disciplined","date":"2013-03-10T05:23:00.000Z","value":0.6907226785551757},{"habit":"imaginative","date":"2013-03-10T23:49:00.000Z","value":0.9007572310511023},{"habit":"collaborative","date":"2013-03-05T11:55:00.000Z","value":0.07541484688408673},{"habit":"persistent","date":"2013-03-30T16:55:00.000Z","value":0.4108200678601861},{"habit":"imaginative","date":"2013-03-16T19:25:00.000Z","value":0.752731477143243},{"habit":"imaginative","date":"2013-04-24T20:29:00.000Z","value":0.8695860090665519},{"habit":"persistent","date":"2013-04-29T06:00:00.000Z","value":0.6092396241147071},{"habit":"inquisitive","date":"2013-02-16T00:32:00.000Z","value":0.4795817295089364},{"habit":"persistent","date":"2013-03-17T17:52:00.000Z","value":0.5798884443938732},{"habit":"imaginative","date":"2013-04-13T18:00:00.000Z","value":0.7779592974111438},{"habit":"inquisitive","date":"2013-01-29T19:23:00.000Z","value":0.07467623776756227},{"habit":"imaginative","date":"2013-01-01T10:46:00.000Z","value":0.5766167331021279},{"habit":"inquisitive","date":"2013-02-15T07:14:00.000Z","value":0.9494392555207014},{"habit":"imaginative","date":"2013-01-04T07:17:00.000Z","value":0.6026322457473725},{"habit":"persistent","date":"2013-04-14T10:05:00.000Z","value":0.6008587048854679},{"habit":"imaginative","date":"2013-04-29T03:10:00.000Z","value":0.9436134889256209},{"habit":"imaginative","date":"2013-04-19T20:15:00.000Z","value":0.9036530556622893},{"habit":"persistent","date":"2013-02-04T02:35:00.000Z","value":0.10854259715415537},{"habit":"imaginative","date":"2013-04-28T23:44:00.000Z","value":0.5277690596412867},{"habit":"disciplined","date":"2013-01-09T10:53:00.000Z","value":0.5365173723548651},{"habit":"disciplined","date":"2013-03-10T03:45:00.000Z","value":0.29089935193769634},{"habit":"persistent","date":"2013-03-06T04:40:00.000Z","value":0.5548606791999191},{"habit":"disciplined","date":"2013-03-04T06:34:00.000Z","value":0.41048984113149345},{"habit":"inquisitive","date":"2013-01-04T16:31:00.000Z","value":0.2774288656655699},{"habit":"collaborative","date":"2013-02-25T17:25:00.000Z","value":0.6472221738658845},{"habit":"inquisitive","date":"2013-04-19T20:06:00.000Z","value":0.5574682659935206},{"habit":"collaborative","date":"2013-03-18T12:40:00.000Z","value":0.8768080889713019},{"habit":"disciplined","date":"2013-03-14T23:20:00.000Z","value":0.01608688780106604},{"habit":"inquisitive","date":"2013-02-13T06:49:00.000Z","value":0.707778895040974},{"habit":"persistent","date":"2013-03-17T21:21:00.000Z","value":0.37257646187208593},{"habit":"collaborative","date":"2013-03-29T06:53:00.000Z","value":0.8428848686162382},{"habit":"disciplined","date":"2013-04-19T15:04:00.000Z","value":0.6124945876654238},{"habit":"collaborative","date":"2013-04-23T19:27:00.000Z","value":0.11592529132030904},{"habit":"collaborative","date":"2013-02-24T19:12:00.000Z","value":0.7347157949116081},{"habit":"disciplined","date":"2013-01-21T16:45:00.000Z","value":0.09479187102988362},{"habit":"inquisitive","date":"2013-04-19T20:05:00.000Z","value":0.7515367495361716},{"habit":"persistent","date":"2013-04-27T21:46:00.000Z","value":0.24099110579118133},{"habit":"persistent","date":"2013-02-28T22:56:00.000Z","value":0.9761462409514934},{"habit":"inquisitive","date":"2013-04-29T05:47:00.000Z","value":0.0638325228355825},{"habit":"disciplined","date":"2013-02-10T01:08:00.000Z","value":0.9343793061561882},{"habit":"inquisitive","date":"2013-01-25T02:09:00.000Z","value":0.4329524284694344},{"habit":"collaborative","date":"2013-03-09T17:27:00.000Z","value":0.12733408459462225},{"habit":"persistent","date":"2013-03-12T12:17:00.000Z","value":0.047853134106844664},{"habit":"disciplined","date":"2013-03-28T02:09:00.000Z","value":0.44446982932277024},{"habit":"imaginative","date":"2013-03-27T10:35:00.000Z","value":0.6821689496282488},{"habit":"collaborative","date":"2013-02-27T05:49:00.000Z","value":0.2526690785307437},{"habit":"disciplined","date":"2013-02-08T21:35:00.000Z","value":0.6524115225765854},{"habit":"inquisitive","date":"2013-01-15T13:00:00.000Z","value":0.5009308133739978},{"habit":"inquisitive","date":"2013-01-29T09:09:00.000Z","value":0.7379288792144507},{"habit":"persistent","date":"2013-04-22T12:37:00.000Z","value":0.17031762283295393},{"habit":"inquisitive","date":"2013-02-03T16:17:00.000Z","value":0.8336445912718773},{"habit":"disciplined","date":"2013-02-03T00:27:00.000Z","value":0.6921785634476691},{"habit":"persistent","date":"2013-02-12T17:28:00.000Z","value":0.6293844457250088},{"habit":"inquisitive","date":"2013-02-04T00:52:00.000Z","value":0.6203354091849178},{"habit":"collaborative","date":"2013-03-15T09:36:00.000Z","value":0.57697185408324},{"habit":"collaborative","date":"2013-04-11T15:13:00.000Z","value":0.03849060577340424},{"habit":"disciplined","date":"2013-04-07T11:02:00.000Z","value":0.6611417683307081},{"habit":"imaginative","date":"2013-02-18T03:02:00.000Z","value":0.6709701120853424},{"habit":"collaborative","date":"2013-03-31T23:26:00.000Z","value":0.9810284131672233},{"habit":"imaginative","date":"2013-01-07T07:42:00.000Z","value":0.5704848340246826},{"habit":"inquisitive","date":"2013-03-16T19:01:00.000Z","value":0.43819460668601096},{"habit":"collaborative","date":"2013-03-05T11:37:00.000Z","value":0.8335926320869476},{"habit":"disciplined","date":"2013-02-28T07:30:00.000Z","value":0.5829702143091708},{"habit":"imaginative","date":"2013-03-06T23:28:00.000Z","value":0.5612662965431809},{"habit":"persistent","date":"2013-04-03T10:38:00.000Z","value":0.7260138387791812},{"habit":"inquisitive","date":"2013-03-21T20:04:00.000Z","value":0.3939325676765293},{"habit":"imaginative","date":"2013-04-04T20:45:00.000Z","value":0.006388131063431501},{"habit":"imaginative","date":"2013-03-08T04:53:00.000Z","value":0.3959503679070622},{"habit":"disciplined","date":"2013-01-12T18:18:00.000Z","value":0.9966571847908199},{"habit":"inquisitive","date":"2013-04-04T22:01:00.000Z","value":0.2436085008084774},{"habit":"collaborative","date":"2013-01-31T15:42:00.000Z","value":0.6036822237074375},{"habit":"persistent","date":"2013-03-25T17:08:00.000Z","value":0.22500586695969105},{"habit":"disciplined","date":"2013-01-04T03:14:00.000Z","value":0.9613943076692522},{"habit":"persistent","date":"2013-02-19T04:08:00.000Z","value":0.8263107724487782},{"habit":"persistent","date":"2013-02-21T15:28:00.000Z","value":0.5655054019298404},{"habit":"persistent","date":"2013-01-08T15:59:00.000Z","value":0.7032686262391508},{"habit":"imaginative","date":"2013-01-31T10:56:00.000Z","value":0.5822171638719738},{"habit":"persistent","date":"2013-03-10T11:15:00.000Z","value":0.04743181983940303},{"habit":"disciplined","date":"2013-03-01T23:10:00.000Z","value":0.10884599038399756},{"habit":"persistent","date":"2013-03-16T00:16:00.000Z","value":0.761910913977772},{"habit":"inquisitive","date":"2013-03-07T12:50:00.000Z","value":0.6345520543400198},{"habit":"disciplined","date":"2013-02-25T07:21:00.000Z","value":0.1938274062704295},{"habit":"inquisitive","date":"2013-03-15T22:17:00.000Z","value":0.8403411260806024},{"habit":"collaborative","date":"2013-03-06T22:18:00.000Z","value":0.8088056710548699},{"habit":"disciplined","date":"2013-01-25T20:02:00.000Z","value":0.07641385309398174},{"habit":"collaborative","date":"2013-02-14T11:35:00.000Z","value":0.22609868738800287},{"habit":"disciplined","date":"2013-03-25T16:23:00.000Z","value":0.6982962894253433},{"habit":"imaginative","date":"2013-03-23T21:50:00.000Z","value":0.20778043218888342},{"habit":"disciplined","date":"2013-03-16T06:39:00.000Z","value":0.7573142936453223},{"habit":"disciplined","date":"2013-04-27T05:22:00.000Z","value":0.385677526704967},{"habit":"collaborative","date":"2013-03-02T12:38:00.000Z","value":0.4041409071069211},{"habit":"inquisitive","date":"2013-01-26T16:59:00.000Z","value":0.6124333059415221},{"habit":"collaborative","date":"2013-03-01T18:33:00.000Z","value":0.7716911141760647},{"habit":"persistent","date":"2013-02-07T06:47:00.000Z","value":0.8475679466500878},{"habit":"collaborative","date":"2013-02-16T02:15:00.000Z","value":0.266034500207752},{"habit":"collaborative","date":"2013-03-10T12:48:00.000Z","value":0.9088707524351776},{"habit":"imaginative","date":"2013-02-19T14:21:00.000Z","value":0.1577735508326441},{"habit":"collaborative","date":"2013-02-13T05:57:00.000Z","value":0.7868310390040278},{"habit":"disciplined","date":"2013-04-25T13:08:00.000Z","value":0.48569913883693516},{"habit":"inquisitive","date":"2013-02-24T04:45:00.000Z","value":0.1198156822938472},{"habit":"inquisitive","date":"2013-02-13T19:40:00.000Z","value":0.9722672109492123},{"habit":"disciplined","date":"2013-04-10T03:03:00.000Z","value":0.44192562927491963},{"habit":"persistent","date":"2013-03-11T03:23:00.000Z","value":0.6452318818774074},{"habit":"inquisitive","date":"2013-03-11T07:43:00.000Z","value":0.6739203170873225},{"habit":"collaborative","date":"2013-02-14T22:07:00.000Z","value":0.1340400781482458},{"habit":"imaginative","date":"2013-03-23T22:57:00.000Z","value":0.30147005850449204},{"habit":"persistent","date":"2013-01-27T09:41:00.000Z","value":0.984003746882081},{"habit":"disciplined","date":"2013-02-25T23:03:00.000Z","value":0.6872649281285703},{"habit":"inquisitive","date":"2013-02-10T19:53:00.000Z","value":0.5830721610691398},{"habit":"inquisitive","date":"2013-04-07T09:06:00.000Z","value":0.27501971344463527},{"habit":"disciplined","date":"2013-04-21T03:58:00.000Z","value":0.31347477179951966},{"habit":"collaborative","date":"2013-01-29T04:38:00.000Z","value":0.10773463291116059},{"habit":"imaginative","date":"2013-02-18T08:53:00.000Z","value":0.6347538819536567},{"habit":"disciplined","date":"2013-03-15T17:40:00.000Z","value":0.8928858349099755},{"habit":"inquisitive","date":"2013-02-03T20:47:00.000Z","value":0.5316788987256587},{"habit":"disciplined","date":"2013-02-18T13:02:00.000Z","value":0.20856735715642571},{"habit":"collaborative","date":"2013-03-19T00:38:00.000Z","value":0.23287908593192697},{"habit":"imaginative","date":"2013-03-01T12:27:00.000Z","value":0.8309948483947664},{"habit":"inquisitive","date":"2013-04-15T04:36:00.000Z","value":0.12379008904099464},{"habit":"imaginative","date":"2013-03-12T15:05:00.000Z","value":0.499780441634357},{"habit":"persistent","date":"2013-02-14T13:09:00.000Z","value":0.8007878460921347},{"habit":"persistent","date":"2013-02-08T19:31:00.000Z","value":0.6027072397992015},{"habit":"disciplined","date":"2013-03-20T06:42:00.000Z","value":0.8016106891445816},{"habit":"collaborative","date":"2013-04-14T12:38:00.000Z","value":0.5488418266177177},{"habit":"collaborative","date":"2013-02-02T22:57:00.000Z","value":0.8658312081824988},{"habit":"imaginative","date":"2013-02-22T09:57:00.000Z","value":0.6484369065146893},{"habit":"inquisitive","date":"2013-01-06T21:18:00.000Z","value":0.5377419185824692},{"habit":"collaborative","date":"2013-03-04T06:04:00.000Z","value":0.16727319383062422},{"habit":"collaborative","date":"2013-03-26T07:36:00.000Z","value":0.9386964922305197},{"habit":"inquisitive","date":"2013-01-23T13:23:00.000Z","value":0.3739892530720681},{"habit":"disciplined","date":"2013-01-30T12:52:00.000Z","value":0.5988338545430452},{"habit":"collaborative","date":"2013-03-01T13:23:00.000Z","value":0.3293111198581755},{"habit":"collaborative","date":"2013-01-21T18:34:00.000Z","value":0.19866189174354076},{"habit":"imaginative","date":"2013-02-08T05:09:00.000Z","value":0.07772774319164455},{"habit":"persistent","date":"2013-01-05T06:36:00.000Z","value":0.03279416519217193},{"habit":"imaginative","date":"2013-03-15T23:22:00.000Z","value":0.4118028129450977},{"habit":"disciplined","date":"2013-02-07T11:39:00.000Z","value":0.7838816866278648},{"habit":"disciplined","date":"2013-02-13T08:12:00.000Z","value":0.32478335313498974},{"habit":"disciplined","date":"2013-01-22T09:31:00.000Z","value":0.44031552714295685},{"habit":"collaborative","date":"2013-03-03T06:17:00.000Z","value":0.06363682472147048},{"habit":"imaginative","date":"2013-02-28T12:24:00.000Z","value":0.7004056861624122},{"habit":"imaginative","date":"2013-03-10T19:36:00.000Z","value":0.4880087757483125},{"habit":"disciplined","date":"2013-04-11T12:09:00.000Z","value":0.361477158498019},{"habit":"persistent","date":"2013-01-16T21:16:00.000Z","value":0.044463406316936016},{"habit":"inquisitive","date":"2013-01-16T23:26:00.000Z","value":0.5817502145655453},{"habit":"collaborative","date":"2013-02-03T19:21:00.000Z","value":0.4968351647257805},{"habit":"persistent","date":"2013-01-11T05:29:00.000Z","value":0.8901282344013453},{"habit":"disciplined","date":"2013-02-13T10:59:00.000Z","value":0.03413570672273636},{"habit":"collaborative","date":"2013-04-18T12:19:00.000Z","value":0.4759420691989362},{"habit":"imaginative","date":"2013-03-26T02:14:00.000Z","value":0.7158545954152942},{"habit":"imaginative","date":"2013-02-23T20:37:00.000Z","value":0.8617040757089853},{"habit":"disciplined","date":"2013-02-25T12:55:00.000Z","value":0.47301571420393884},{"habit":"disciplined","date":"2013-01-22T06:45:00.000Z","value":0.2897151655051857},{"habit":"imaginative","date":"2013-04-26T12:50:00.000Z","value":0.46868420811370015},{"habit":"inquisitive","date":"2013-02-18T15:37:00.000Z","value":0.40076483064331114},{"habit":"inquisitive","date":"2013-03-26T07:20:00.000Z","value":0.39008205756545067},{"habit":"collaborative","date":"2013-03-27T16:18:00.000Z","value":0.777996375458315},{"habit":"imaginative","date":"2013-03-02T13:12:00.000Z","value":0.41432063886895776},{"habit":"persistent","date":"2013-02-05T13:03:00.000Z","value":0.5450904159806669},{"habit":"disciplined","date":"2013-03-27T03:47:00.000Z","value":0.15573015273548663},{"habit":"imaginative","date":"2013-02-07T13:34:00.000Z","value":0.5112874899059534},{"habit":"imaginative","date":"2013-03-24T05:01:00.000Z","value":0.3117874108720571},{"habit":"collaborative","date":"2013-02-11T00:30:00.000Z","value":0.16747777722775936},{"habit":"imaginative","date":"2013-01-28T19:56:00.000Z","value":0.1848628162406385},{"habit":"imaginative","date":"2013-02-22T16:18:00.000Z","value":0.1987857185304165},{"habit":"disciplined","date":"2013-02-26T10:39:00.000Z","value":0.14771924237720668},{"habit":"imaginative","date":"2013-01-22T05:06:00.000Z","value":0.8420163958799094},{"habit":"inquisitive","date":"2013-02-01T03:01:00.000Z","value":0.3440635381266475},{"habit":"persistent","date":"2013-03-03T06:13:00.000Z","value":0.3743212011177093},{"habit":"disciplined","date":"2013-03-12T03:59:00.000Z","value":0.16427297447808087},{"habit":"imaginative","date":"2013-04-27T14:37:00.000Z","value":0.17807318572886288},{"habit":"persistent","date":"2013-01-22T04:33:00.000Z","value":0.34521270520053804},{"habit":"disciplined","date":"2013-04-09T03:47:00.000Z","value":0.17027882440015674},{"habit":"imaginative","date":"2013-03-18T05:22:00.000Z","value":0.8101587856654078},{"habit":"collaborative","date":"2013-03-01T07:50:00.000Z","value":0.2634460621047765},{"habit":"collaborative","date":"2013-01-03T02:39:00.000Z","value":0.2592104331124574},{"habit":"inquisitive","date":"2013-02-21T05:24:00.000Z","value":0.4849985456094146},{"habit":"disciplined","date":"2013-04-26T07:13:00.000Z","value":0.45171197317540646},{"habit":"collaborative","date":"2013-02-21T07:57:00.000Z","value":0.5980437912512571},{"habit":"persistent","date":"2013-02-25T16:54:00.000Z","value":0.16213066224008799},{"habit":"disciplined","date":"2013-03-16T06:19:00.000Z","value":0.5791427025105804},{"habit":"imaginative","date":"2013-02-10T10:00:00.000Z","value":0.5447545573115349},{"habit":"disciplined","date":"2013-03-19T02:49:00.000Z","value":0.2853930334094912},{"habit":"imaginative","date":"2013-03-05T05:08:00.000Z","value":0.3705679322592914},{"habit":"imaginative","date":"2013-01-02T21:51:00.000Z","value":0.7844337823335081},{"habit":"collaborative","date":"2013-03-26T13:29:00.000Z","value":0.9722101448569447},{"habit":"imaginative","date":"2013-01-18T23:05:00.000Z","value":0.7530253389850259},{"habit":"collaborative","date":"2013-03-24T11:53:00.000Z","value":0.16561014018952847},{"habit":"inquisitive","date":"2013-02-02T10:42:00.000Z","value":0.32878608745522797},{"habit":"inquisitive","date":"2013-01-08T01:53:00.000Z","value":0.061662639025598764},{"habit":"inquisitive","date":"2013-03-01T00:05:00.000Z","value":0.32225689268670976},{"habit":"disciplined","date":"2013-03-19T18:51:00.000Z","value":0.284246149007231},{"habit":"imaginative","date":"2013-02-27T22:20:00.000Z","value":0.8957783475052565},{"habit":"imaginative","date":"2013-02-28T19:42:00.000Z","value":0.8628195812925696},{"habit":"inquisitive","date":"2013-02-24T20:44:00.000Z","value":0.34524739370681345},{"habit":"imaginative","date":"2013-02-10T09:40:00.000Z","value":0.5442331894300878},{"habit":"collaborative","date":"2013-01-21T14:44:00.000Z","value":0.32971979794092476},{"habit":"persistent","date":"2013-02-09T23:35:00.000Z","value":0.27184862294234335},{"habit":"imaginative","date":"2013-01-21T09:34:00.000Z","value":0.7765083150006831},{"habit":"collaborative","date":"2013-01-17T08:11:00.000Z","value":0.8869439433328807},{"habit":"imaginative","date":"2013-01-08T08:09:00.000Z","value":0.03134428523480892},{"habit":"disciplined","date":"2013-02-28T02:19:00.000Z","value":0.7480432479642332},{"habit":"imaginative","date":"2013-02-26T12:06:00.000Z","value":0.3756620781496167},{"habit":"imaginative","date":"2013-01-04T18:58:00.000Z","value":0.15509533532895148},{"habit":"disciplined","date":"2013-01-18T16:02:00.000Z","value":0.34276411100290716},{"habit":"imaginative","date":"2013-04-24T07:04:00.000Z","value":0.7551459798123688},{"habit":"collaborative","date":"2013-01-25T06:03:00.000Z","value":0.5173723855987191},{"habit":"disciplined","date":"2013-03-05T03:43:00.000Z","value":0.6857340093702078},{"habit":"inquisitive","date":"2013-03-04T05:52:00.000Z","value":0.09149711742065847},{"habit":"imaginative","date":"2013-03-17T14:22:00.000Z","value":0.29964064061641693},{"habit":"collaborative","date":"2013-03-02T11:35:00.000Z","value":0.36299662571400404},{"habit":"inquisitive","date":"2013-02-28T03:30:00.000Z","value":0.9463235002476722},{"habit":"inquisitive","date":"2013-01-21T08:46:00.000Z","value":0.4827913788612932},{"habit":"inquisitive","date":"2013-04-25T04:08:00.000Z","value":0.9179459786973894},{"habit":"collaborative","date":"2013-02-15T23:59:00.000Z","value":0.867605357663706},{"habit":"collaborative","date":"2013-01-19T00:49:00.000Z","value":0.9878948836121708},{"habit":"inquisitive","date":"2013-02-21T23:09:00.000Z","value":0.6023138165473938},{"habit":"disciplined","date":"2013-03-01T03:52:00.000Z","value":0.19085134309716523},{"habit":"persistent","date":"2013-01-31T20:19:00.000Z","value":0.7085676377173513},{"habit":"persistent","date":"2013-03-10T05:40:00.000Z","value":0.9069911208935082},{"habit":"collaborative","date":"2013-03-08T13:51:00.000Z","value":0.10553885879926383},{"habit":"collaborative","date":"2013-03-10T01:58:00.000Z","value":0.38964073243550956},{"habit":"collaborative","date":"2013-03-05T02:38:00.000Z","value":0.36274653882719576},{"habit":"imaginative","date":"2013-03-26T04:02:00.000Z","value":0.3148089915048331},{"habit":"imaginative","date":"2013-02-16T20:52:00.000Z","value":0.5362453917041421},{"habit":"persistent","date":"2013-03-02T22:19:00.000Z","value":0.5115703877527267}];
//var habitsData2 = [{"habit":"disciplined","date":"2013-09-04T21:40:00.000Z","value":0.24747555353678763},{"habit":"inquisitive","date":"2013-09-27T03:28:00.000Z","value":0.8475350839318707},{"habit":"inquisitive","date":"2013-09-30T07:43:00.000Z","value":0.7350433567306026},{"habit":"disciplined","date":"2013-09-14T15:19:00.000Z","value":0.28873851222451774},{"habit":"collaborative","date":"2013-09-19T13:21:00.000Z","value":0.26506221815943715},{"habit":"inquisitive","date":"2013-09-15T15:24:00.000Z","value":0.9699528899742289},{"habit":"collaborative","date":"2013-09-09T23:29:00.000Z","value":0.11416635294444859},{"habit":"collaborative","date":"2013-09-18T21:56:00.000Z","value":0.2693762518465519},{"habit":"disciplined","date":"2013-09-28T23:04:00.000Z","value":0.23265250185504555},{"habit":"imaginative","date":"2013-09-11T10:47:00.000Z","value":0.192085505858995},{"habit":"inquisitive","date":"2013-09-09T12:31:00.000Z","value":0.9721861905185505},{"habit":"disciplined","date":"2013-09-23T10:25:00.000Z","value":0.08908184689935296},{"habit":"persistent","date":"2013-09-20T19:58:00.000Z","value":0.17233456384856252},{"habit":"inquisitive","date":"2013-09-09T23:45:00.000Z","value":0.7443976819282397},{"habit":"disciplined","date":"2013-09-09T11:03:00.000Z","value":0.2939084404846653},{"habit":"collaborative","date":"2013-09-25T10:08:00.000Z","value":0.14129491313360631},{"habit":"disciplined","date":"2013-09-16T17:06:00.000Z","value":0.12206620064098388},{"habit":"disciplined","date":"2013-09-21T18:53:00.000Z","value":0.1749470749637112},{"habit":"imaginative","date":"2013-09-19T17:22:00.000Z","value":0.00907880652230233},{"habit":"disciplined","date":"2013-09-11T03:10:00.000Z","value":0.05616027577780187},{"habit":"collaborative","date":"2013-09-01T05:15:00.000Z","value":0.14909047277178614},{"habit":"disciplined","date":"2013-09-28T09:12:00.000Z","value":0.15266873887740076},{"habit":"inquisitive","date":"2013-09-21T04:12:00.000Z","value":0.7422534386161714},{"habit":"collaborative","date":"2013-09-14T10:03:00.000Z","value":0.24690669451374558},{"habit":"collaborative","date":"2013-09-19T09:34:00.000Z","value":0.28504977612756194},{"habit":"collaborative","date":"2013-09-14T12:20:00.000Z","value":0.03647384354844689},{"habit":"disciplined","date":"2013-09-13T11:09:00.000Z","value":0.07885665020439774},{"habit":"inquisitive","date":"2013-10-01T11:35:00.000Z","value":0.761357881152071},{"habit":"imaginative","date":"2013-09-01T08:55:00.000Z","value":0.29032438471913335},{"habit":"disciplined","date":"2013-09-24T22:59:00.000Z","value":0.21630344060249626},{"habit":"persistent","date":"2013-09-02T08:20:00.000Z","value":0.09046595371328293},{"habit":"disciplined","date":"2013-09-17T20:01:00.000Z","value":0.10491102850064635},{"habit":"persistent","date":"2013-09-07T14:21:00.000Z","value":0.24827130334451794},{"habit":"persistent","date":"2013-09-26T15:33:00.000Z","value":0.2828014355152845},{"habit":"collaborative","date":"2013-09-13T03:19:00.000Z","value":0.29866819046437737},{"habit":"persistent","date":"2013-09-29T07:23:00.000Z","value":0.28228699662722645},{"habit":"persistent","date":"2013-09-22T05:20:00.000Z","value":0.04414139539003372},{"habit":"imaginative","date":"2013-09-12T02:50:00.000Z","value":0.04659051240887493},{"habit":"imaginative","date":"2013-09-20T21:31:00.000Z","value":0.06391359334811568},{"habit":"disciplined","date":"2013-09-06T02:22:00.000Z","value":0.17925490897614507},{"habit":"persistent","date":"2013-09-08T12:34:00.000Z","value":0.03195571240503341},{"habit":"persistent","date":"2013-09-15T02:29:00.000Z","value":0.10527200291398912},{"habit":"persistent","date":"2013-09-21T22:54:00.000Z","value":0.12915884570684283},{"habit":"disciplined","date":"2013-09-09T10:54:00.000Z","value":0.12640042291022838},{"habit":"inquisitive","date":"2013-09-08T14:14:00.000Z","value":0.8656216983450576},{"habit":"collaborative","date":"2013-09-02T02:49:00.000Z","value":0.22399424698669462},{"habit":"inquisitive","date":"2013-09-26T12:13:00.000Z","value":0.7309352753451094},{"habit":"persistent","date":"2013-09-11T00:10:00.000Z","value":0.14965655033010988},{"habit":"disciplined","date":"2013-09-17T07:50:00.000Z","value":0.07501212239731103},{"habit":"imaginative","date":"2013-09-20T02:12:00.000Z","value":0.2098385049495846},{"habit":"collaborative","date":"2013-09-27T05:39:00.000Z","value":0.016722349589690565},{"habit":"disciplined","date":"2013-09-25T17:16:00.000Z","value":0.2546918274834752},{"habit":"imaginative","date":"2013-09-14T15:53:00.000Z","value":0.005595767986960709},{"habit":"inquisitive","date":"2013-09-27T15:31:00.000Z","value":0.8604664893355221},{"habit":"imaginative","date":"2013-09-02T02:02:00.000Z","value":0.19861382085364312},{"habit":"persistent","date":"2013-09-07T07:16:00.000Z","value":0.08122777591925114},{"habit":"collaborative","date":"2013-09-09T17:20:00.000Z","value":0.06421331553719938},{"habit":"disciplined","date":"2013-10-01T07:24:00.000Z","value":0.079645257582888},{"habit":"persistent","date":"2013-09-06T02:11:00.000Z","value":0.06864142064005137},{"habit":"imaginative","date":"2013-09-30T08:54:00.000Z","value":0.10045466010924428},{"habit":"imaginative","date":"2013-09-30T19:06:00.000Z","value":0.17379989500623197},{"habit":"collaborative","date":"2013-09-06T12:16:00.000Z","value":0.29595216375309974},{"habit":"inquisitive","date":"2013-09-22T21:46:00.000Z","value":0.8922787133371457},{"habit":"imaginative","date":"2013-09-19T15:43:00.000Z","value":0.17120960152242332},{"habit":"disciplined","date":"2013-09-20T21:08:00.000Z","value":0.2780393441906199},{"habit":"collaborative","date":"2013-09-12T02:19:00.000Z","value":0.2540492998436093},{"habit":"persistent","date":"2013-09-02T23:15:00.000Z","value":0.2741727003827691},{"habit":"inquisitive","date":"2013-09-01T06:05:00.000Z","value":0.8420860220212489},{"habit":"disciplined","date":"2013-09-20T05:42:00.000Z","value":0.1711256269365549},{"habit":"collaborative","date":"2013-09-19T16:28:00.000Z","value":0.00870203620288521},{"habit":"inquisitive","date":"2013-09-27T08:12:00.000Z","value":0.954988812841475},{"habit":"persistent","date":"2013-09-14T14:04:00.000Z","value":0.08078508507460355},{"habit":"disciplined","date":"2013-09-08T22:35:00.000Z","value":0.11772436026949434},{"habit":"collaborative","date":"2013-09-03T14:06:00.000Z","value":0.14539578747935591},{"habit":"collaborative","date":"2013-09-08T04:18:00.000Z","value":0.20357558699324727},{"habit":"collaborative","date":"2013-09-17T21:34:00.000Z","value":0.06725471026729792},{"habit":"persistent","date":"2013-09-25T23:55:00.000Z","value":0.18072703380603342},{"habit":"persistent","date":"2013-09-23T01:45:00.000Z","value":0.07415790259838104},{"habit":"inquisitive","date":"2013-09-30T01:20:00.000Z","value":0.7442358186468482},{"habit":"disciplined","date":"2013-09-24T14:20:00.000Z","value":0.08833519374020397},{"habit":"persistent","date":"2013-09-09T20:52:00.000Z","value":0.02147092006634921},{"habit":"inquisitive","date":"2013-09-25T09:55:00.000Z","value":0.8084000821691006},{"habit":"collaborative","date":"2013-09-16T13:57:00.000Z","value":0.11429911977611482},{"habit":"collaborative","date":"2013-09-25T18:53:00.000Z","value":0.15999446434434503},{"habit":"imaginative","date":"2013-09-24T08:34:00.000Z","value":0.27201851780992},{"habit":"imaginative","date":"2013-09-09T22:25:00.000Z","value":0.10574735747650266},{"habit":"imaginative","date":"2013-09-14T14:27:00.000Z","value":0.08530945898965},{"habit":"inquisitive","date":"2013-09-30T10:12:00.000Z","value":0.7368576782057061},{"habit":"imaginative","date":"2013-09-24T04:25:00.000Z","value":0.16750916386954487},{"habit":"inquisitive","date":"2013-10-01T05:03:00.000Z","value":0.9652237931033596},{"habit":"inquisitive","date":"2013-09-20T12:40:00.000Z","value":0.750228581787087},{"habit":"persistent","date":"2013-10-01T05:33:00.000Z","value":0.07913999534212053},{"habit":"disciplined","date":"2013-09-04T18:04:00.000Z","value":0.09197266933042555},{"habit":"persistent","date":"2013-09-24T17:56:00.000Z","value":0.07704756120219826},{"habit":"persistent","date":"2013-09-08T09:04:00.000Z","value":0.011746432911604642},{"habit":"imaginative","date":"2013-09-11T22:06:00.000Z","value":0.14485793095082045},{"habit":"persistent","date":"2013-09-29T19:38:00.000Z","value":0.10899434848688543},{"habit":"collaborative","date":"2013-09-24T18:30:00.000Z","value":0.21385625679977238},{"habit":"disciplined","date":"2013-09-07T19:18:00.000Z","value":0.25449312538839874},{"habit":"collaborative","date":"2013-09-02T15:53:00.000Z","value":0.27359645103570074},{"habit":"persistent","date":"2013-09-22T13:54:00.000Z","value":0.1281895162537694},{"habit":"collaborative","date":"2013-09-08T20:30:00.000Z","value":0.2008768703090027},{"habit":"inquisitive","date":"2013-09-09T17:18:00.000Z","value":0.7790248905075714},{"habit":"collaborative","date":"2013-09-17T21:30:00.000Z","value":0.2660814420785755},{"habit":"persistent","date":"2013-09-24T11:54:00.000Z","value":0.06688770297914744},{"habit":"inquisitive","date":"2013-09-29T08:16:00.000Z","value":0.7252876404905692},{"habit":"disciplined","date":"2013-09-19T14:32:00.000Z","value":0.23508454381953925},{"habit":"imaginative","date":"2013-09-05T11:37:00.000Z","value":0.07263220769818872},{"habit":"imaginative","date":"2013-09-13T12:39:00.000Z","value":0.13127734770532698},{"habit":"persistent","date":"2013-09-21T07:41:00.000Z","value":0.008995096245780586},{"habit":"collaborative","date":"2013-09-06T11:32:00.000Z","value":0.01963519868440926},{"habit":"persistent","date":"2013-09-23T23:53:00.000Z","value":0.011839609290473162},{"habit":"inquisitive","date":"2013-09-21T23:10:00.000Z","value":0.7343181713717057},{"habit":"persistent","date":"2013-09-16T09:20:00.000Z","value":0.12735058539547026},{"habit":"disciplined","date":"2013-09-15T09:33:00.000Z","value":0.09469827285502105},{"habit":"imaginative","date":"2013-09-18T05:18:00.000Z","value":0.18861843449994922},{"habit":"imaginative","date":"2013-09-17T02:08:00.000Z","value":0.29652004125528036},{"habit":"collaborative","date":"2013-09-27T09:07:00.000Z","value":0.2574764148099348},{"habit":"collaborative","date":"2013-09-20T01:59:00.000Z","value":0.11721195937134325},{"habit":"inquisitive","date":"2013-09-04T07:22:00.000Z","value":0.7366414922988042},{"habit":"imaginative","date":"2013-09-21T18:05:00.000Z","value":0.26180181198287755},{"habit":"inquisitive","date":"2013-09-23T13:45:00.000Z","value":0.7610566736198962},{"habit":"inquisitive","date":"2013-09-27T22:55:00.000Z","value":0.9725936483824624},{"habit":"imaginative","date":"2013-09-04T21:39:00.000Z","value":0.2887013505678624},{"habit":"persistent","date":"2013-09-28T20:14:00.000Z","value":0.05384104717522859},{"habit":"collaborative","date":"2013-09-29T19:09:00.000Z","value":0.26216903831809757},{"habit":"inquisitive","date":"2013-09-20T19:59:00.000Z","value":0.8501651142723858},{"habit":"imaginative","date":"2013-09-02T04:48:00.000Z","value":0.07903905054554343},{"habit":"inquisitive","date":"2013-09-29T13:33:00.000Z","value":0.937386216665618},{"habit":"persistent","date":"2013-09-14T02:56:00.000Z","value":0.206565346266143},{"habit":"persistent","date":"2013-09-13T20:53:00.000Z","value":0.09346340959891676},{"habit":"persistent","date":"2013-09-07T23:02:00.000Z","value":0.1664876020979136},{"habit":"disciplined","date":"2013-09-28T06:35:00.000Z","value":0.19755843251477925},{"habit":"disciplined","date":"2013-09-30T11:19:00.000Z","value":0.25146392388269306},{"habit":"inquisitive","date":"2013-09-17T01:19:00.000Z","value":0.8059365133522078},{"habit":"imaginative","date":"2013-09-03T15:52:00.000Z","value":0.09201033725403249},{"habit":"imaginative","date":"2013-10-01T10:51:00.000Z","value":0.16126753671560437},{"habit":"imaginative","date":"2013-09-05T14:23:00.000Z","value":0.1737100679660216},{"habit":"disciplined","date":"2013-09-14T01:13:00.000Z","value":0.175950996321626},{"habit":"imaginative","date":"2013-09-24T07:18:00.000Z","value":0.13037295285612344},{"habit":"disciplined","date":"2013-09-08T18:40:00.000Z","value":0.25844328333623706},{"habit":"disciplined","date":"2013-09-27T05:34:00.000Z","value":0.23806712406221775},{"habit":"disciplined","date":"2013-09-02T19:35:00.000Z","value":0.005884724739007652},{"habit":"collaborative","date":"2013-09-25T04:27:00.000Z","value":0.01476225326769054},{"habit":"persistent","date":"2013-09-21T12:50:00.000Z","value":0.2047042541205883},{"habit":"persistent","date":"2013-09-29T08:09:00.000Z","value":0.04845719835720956},{"habit":"disciplined","date":"2013-09-15T21:06:00.000Z","value":0.21500031680334358},{"habit":"collaborative","date":"2013-09-26T18:44:00.000Z","value":0.22237862516194581},{"habit":"disciplined","date":"2013-09-13T00:05:00.000Z","value":0.29615524706896396},{"habit":"disciplined","date":"2013-09-06T14:00:00.000Z","value":0.07197055493015796}];
var habitsData2 = [{"habit":"inquisitive","date":"2013-05-02T03:30:26.979Z","value":0.8609022240387275},{"habit":"imaginative","date":"2013-01-16T06:23:07.097Z","value":0.04266892599407583},{"habit":"inquisitive","date":"2013-01-29T11:22:03.599Z","value":0.7582483308622613},{"habit":"imaginative","date":"2013-08-26T15:40:12.805Z","value":0.24551445676479489},{"habit":"collaborative","date":"2013-08-11T19:36:05.969Z","value":0.19161240344401448},{"habit":"inquisitive","date":"2013-09-03T22:50:46.864Z","value":0.9829429224599152},{"habit":"inquisitive","date":"2013-06-17T19:50:22.445Z","value":0.7627869852352887},{"habit":"collaborative","date":"2013-05-16T13:06:01.247Z","value":0.11756032824050634},{"habit":"collaborative","date":"2013-06-23T16:56:18.807Z","value":0.22202958441339432},{"habit":"collaborative","date":"2013-07-10T03:07:04.121Z","value":0.1707241457188502},{"habit":"collaborative","date":"2013-04-30T10:11:32.530Z","value":0.14672696718480438},{"habit":"inquisitive","date":"2013-05-20T06:47:54.441Z","value":0.9774353945394978},{"habit":"inquisitive","date":"2013-07-12T17:48:30.718Z","value":0.980340684694238},{"habit":"inquisitive","date":"2013-02-08T22:34:10.861Z","value":0.9972069523995741},{"habit":"disciplined","date":"2013-05-03T11:51:39.125Z","value":0.10086474807467312},{"habit":"collaborative","date":"2013-07-28T00:42:45.169Z","value":0.20712175138760358},{"habit":"persistent","date":"2013-07-27T13:42:52.650Z","value":0.13308203858323395},{"habit":"imaginative","date":"2013-07-19T20:29:47.511Z","value":0.017268488486297428},{"habit":"imaginative","date":"2013-03-30T07:52:21.039Z","value":0.061059495946392414},{"habit":"disciplined","date":"2013-02-09T23:07:58.717Z","value":0.2854589517926797},{"habit":"persistent","date":"2013-03-02T10:16:18.384Z","value":0.06715232776477932},{"habit":"disciplined","date":"2013-09-03T23:20:03.730Z","value":0.15986844724975527},{"habit":"collaborative","date":"2013-02-06T11:19:06.772Z","value":0.20091562145389616},{"habit":"disciplined","date":"2013-03-03T08:34:54.525Z","value":0.1701383132720366},{"habit":"collaborative","date":"2013-09-03T17:52:41.505Z","value":0.2967994875507429},{"habit":"collaborative","date":"2013-05-25T12:51:07.615Z","value":0.003943396476097405},{"habit":"disciplined","date":"2013-01-15T07:04:15.748Z","value":0.1391775459749624},{"habit":"collaborative","date":"2013-02-25T18:56:07.103Z","value":0.14597147991880774},{"habit":"inquisitive","date":"2013-01-18T18:53:53.003Z","value":0.8780543386703357},{"habit":"persistent","date":"2013-08-22T18:10:13.356Z","value":0.10169237579684705},{"habit":"collaborative","date":"2013-03-21T21:37:20.076Z","value":0.033675756119191644},{"habit":"persistent","date":"2013-06-30T08:43:13.729Z","value":0.03496747214812785},{"habit":"imaginative","date":"2013-01-23T13:55:55.966Z","value":0.19455980267375708},{"habit":"imaginative","date":"2013-07-21T00:21:02.602Z","value":0.0778387527912855},{"habit":"persistent","date":"2013-07-16T03:22:26.745Z","value":0.00940800115931779},{"habit":"collaborative","date":"2013-05-01T18:24:46.512Z","value":0.09535185140557587},{"habit":"disciplined","date":"2013-04-20T20:47:56.582Z","value":0.04194849003106355},{"habit":"persistent","date":"2013-02-01T20:24:54.859Z","value":0.2460030683549121},{"habit":"collaborative","date":"2013-03-29T13:33:50.661Z","value":0.021305672801099716},{"habit":"imaginative","date":"2013-09-01T23:38:39.051Z","value":0.026928387489169835},{"habit":"imaginative","date":"2013-02-27T06:17:18.383Z","value":0.2954998453147709},{"habit":"disciplined","date":"2013-05-19T18:18:57.082Z","value":0.13444664063863457},{"habit":"persistent","date":"2013-03-17T14:55:10.697Z","value":0.1805885618319735},{"habit":"collaborative","date":"2013-07-28T17:37:22.985Z","value":0.047889788565225896},{"habit":"inquisitive","date":"2013-05-20T01:31:59.227Z","value":0.8285814818460494},{"habit":"disciplined","date":"2013-03-27T23:48:05.733Z","value":0.15855810893699526},{"habit":"disciplined","date":"2013-03-14T11:06:29.328Z","value":0.15415003169327973},{"habit":"collaborative","date":"2013-07-04T07:55:32.630Z","value":0.0028717058943584562},{"habit":"collaborative","date":"2013-07-04T09:23:24.215Z","value":0.22587536454666404},{"habit":"disciplined","date":"2013-05-20T22:46:59.529Z","value":0.24425621009431778},{"habit":"disciplined","date":"2013-09-04T02:05:13.557Z","value":0.26071575412061065},{"habit":"collaborative","date":"2013-07-07T13:06:52.991Z","value":0.06986651667393744},{"habit":"collaborative","date":"2013-06-08T17:53:53.335Z","value":0.1794174848590046},{"habit":"inquisitive","date":"2013-07-28T13:14:17.091Z","value":0.7646892205812037},{"habit":"imaginative","date":"2013-05-20T22:41:32.014Z","value":0.10235888434108346},{"habit":"disciplined","date":"2013-06-25T11:18:18.346Z","value":0.1944345958298072},{"habit":"collaborative","date":"2013-06-23T10:02:42.975Z","value":0.2722731413785368},{"habit":"collaborative","date":"2013-07-05T17:52:18.206Z","value":0.1420908351894468},{"habit":"persistent","date":"2013-04-14T06:13:29.417Z","value":0.1525972211966291},{"habit":"disciplined","date":"2013-05-08T04:16:45.624Z","value":0.2524868595879525},{"habit":"persistent","date":"2013-05-25T06:16:31.530Z","value":0.2229431270621717},{"habit":"persistent","date":"2013-01-11T12:21:45.149Z","value":0.08847896126098931},{"habit":"collaborative","date":"2013-05-29T05:40:08.134Z","value":0.07233554595150053},{"habit":"disciplined","date":"2013-04-04T23:43:12.731Z","value":0.29165278882719575},{"habit":"collaborative","date":"2013-03-21T07:59:45.115Z","value":0.27820159667171535},{"habit":"collaborative","date":"2013-05-04T16:19:11.002Z","value":0.20111690908670424},{"habit":"imaginative","date":"2013-09-03T04:25:52.581Z","value":0.09794958452694118},{"habit":"imaginative","date":"2013-02-20T21:25:31.740Z","value":0.17022475535050033},{"habit":"imaginative","date":"2013-06-09T01:18:52.773Z","value":0.02014218515250832},{"habit":"inquisitive","date":"2013-01-17T00:21:15.467Z","value":0.7164690787205472},{"habit":"collaborative","date":"2013-03-23T01:53:01.550Z","value":0.2464816171210259},{"habit":"imaginative","date":"2013-05-07T23:28:58.960Z","value":0.07961660132277756},{"habit":"persistent","date":"2013-02-12T03:07:00.911Z","value":0.09705481042619794},{"habit":"imaginative","date":"2013-07-12T20:39:32.786Z","value":0.25690084090456367},{"habit":"imaginative","date":"2013-06-21T17:28:15.708Z","value":0.0713409936055541},{"habit":"disciplined","date":"2013-01-11T13:01:07.424Z","value":0.20482688995543866},{"habit":"inquisitive","date":"2013-07-07T06:10:24.445Z","value":0.9280608584173023},{"habit":"disciplined","date":"2013-02-20T12:48:06.674Z","value":0.04466650011017918},{"habit":"persistent","date":"2013-03-20T15:35:01.042Z","value":0.26301532925572246},{"habit":"imaginative","date":"2013-09-05T02:10:41.976Z","value":0.06378840208053589},{"habit":"imaginative","date":"2013-02-15T00:16:14.829Z","value":0.05552263793069869},{"habit":"persistent","date":"2013-04-24T21:07:38.325Z","value":0.09521508975885808},{"habit":"imaginative","date":"2013-01-24T13:16:12.680Z","value":0.11260783779434859},{"habit":"imaginative","date":"2013-04-20T11:24:49.159Z","value":0.22463062852621077},{"habit":"persistent","date":"2013-03-11T07:50:25.348Z","value":0.12281640395522117},{"habit":"imaginative","date":"2013-09-06T15:34:16.126Z","value":0.25627538266126065},{"habit":"inquisitive","date":"2013-07-14T18:34:04.184Z","value":0.7870316322660074},{"habit":"collaborative","date":"2013-04-14T12:49:45.206Z","value":0.1893845718121156},{"habit":"disciplined","date":"2013-01-29T15:30:05.856Z","value":0.18150564744137226},{"habit":"disciplined","date":"2013-01-24T12:49:53.565Z","value":0.03021396354306489},{"habit":"inquisitive","date":"2013-07-21T12:43:59.163Z","value":0.7196338396985084},{"habit":"disciplined","date":"2013-01-26T00:17:25.734Z","value":0.2168103360570967},{"habit":"imaginative","date":"2013-07-10T07:44:35.595Z","value":0.26824177005328237},{"habit":"persistent","date":"2013-07-22T21:15:12.121Z","value":0.29573977519758043},{"habit":"inquisitive","date":"2013-07-28T02:27:22.505Z","value":0.9715784256346522},{"habit":"imaginative","date":"2013-03-16T10:24:53.975Z","value":0.23682348334696143},{"habit":"imaginative","date":"2013-07-03T07:09:03.326Z","value":0.04470472228713333},{"habit":"persistent","date":"2013-05-26T01:57:39.457Z","value":0.05892574433237314},{"habit":"disciplined","date":"2013-08-10T03:02:06.183Z","value":0.2668118227506056},{"habit":"collaborative","date":"2013-08-23T14:44:10.696Z","value":0.2774453926132992},{"habit":"persistent","date":"2013-07-27T04:05:10.818Z","value":0.09690052864607424},{"habit":"imaginative","date":"2013-07-24T14:32:41.048Z","value":0.15716486340388655},{"habit":"inquisitive","date":"2013-06-01T01:37:28.236Z","value":0.9958167793229222},{"habit":"imaginative","date":"2013-04-16T11:23:52.041Z","value":0.25110182329081},{"habit":"inquisitive","date":"2013-01-11T04:42:18.360Z","value":0.807073095231317},{"habit":"disciplined","date":"2013-04-20T16:06:34.869Z","value":0.2614362032152712},{"habit":"imaginative","date":"2013-04-11T19:51:28.495Z","value":0.13732916372828186},{"habit":"inquisitive","date":"2013-05-16T18:59:47.132Z","value":0.7232038045767695},{"habit":"imaginative","date":"2013-05-02T20:20:34.555Z","value":0.19758578853216022},{"habit":"disciplined","date":"2013-03-22T04:44:49.613Z","value":0.05001149496529251},{"habit":"imaginative","date":"2013-05-01T18:01:54.378Z","value":0.2754453327739611},{"habit":"inquisitive","date":"2013-03-05T00:55:01.198Z","value":0.8904430477647111},{"habit":"inquisitive","date":"2013-01-11T09:11:04.260Z","value":0.7980614706408232},{"habit":"inquisitive","date":"2013-05-06T21:04:30.856Z","value":0.7041672433726489},{"habit":"persistent","date":"2013-02-14T11:42:06.239Z","value":0.054967429605312645},{"habit":"collaborative","date":"2013-07-25T17:36:09.288Z","value":0.06915710445027798},{"habit":"persistent","date":"2013-06-14T02:04:16.194Z","value":0.1105961574241519},{"habit":"disciplined","date":"2013-08-29T18:41:17.422Z","value":0.20296509072650223},{"habit":"collaborative","date":"2013-05-16T01:08:40.772Z","value":0.23850850048474967},{"habit":"collaborative","date":"2013-02-28T17:28:06.262Z","value":0.214300171402283},{"habit":"collaborative","date":"2013-06-18T16:16:52.155Z","value":0.12098110145889222},{"habit":"collaborative","date":"2013-06-15T07:06:15.111Z","value":0.2961740731727332},{"habit":"collaborative","date":"2013-08-04T16:15:51.437Z","value":0.2367336203344166},{"habit":"inquisitive","date":"2013-06-29T23:14:45.555Z","value":0.7022683324292301},{"habit":"inquisitive","date":"2013-08-16T00:51:44.371Z","value":0.7732303127879276},{"habit":"disciplined","date":"2013-08-22T07:46:47.703Z","value":0.28971544874366373},{"habit":"imaginative","date":"2013-08-25T17:48:03.789Z","value":0.17336142535787075},{"habit":"imaginative","date":"2013-05-13T22:50:38.650Z","value":0.06884168882388621},{"habit":"disciplined","date":"2013-03-07T16:22:57.497Z","value":0.1557911500101909},{"habit":"collaborative","date":"2013-07-12T13:21:01.484Z","value":0.04207808508072048},{"habit":"disciplined","date":"2013-01-30T22:37:52.517Z","value":0.06713713193312287},{"habit":"imaginative","date":"2013-03-07T21:18:27.182Z","value":0.0007985350443050265},{"habit":"persistent","date":"2013-04-28T02:19:22.190Z","value":0.22778105477336794},{"habit":"disciplined","date":"2013-04-17T14:45:05.743Z","value":0.07658524971920996},{"habit":"disciplined","date":"2013-05-06T08:43:31.762Z","value":0.17761706442106515},{"habit":"disciplined","date":"2013-03-31T11:49:30.849Z","value":0.25122972805984317},{"habit":"persistent","date":"2013-03-04T20:46:46.641Z","value":0.277619430469349},{"habit":"collaborative","date":"2013-07-04T00:31:12.417Z","value":0.1082525853998959},{"habit":"collaborative","date":"2013-03-11T11:34:59.492Z","value":0.1723542647436261},{"habit":"imaginative","date":"2013-04-03T21:15:24.952Z","value":0.26583453663624823},{"habit":"imaginative","date":"2013-07-18T13:27:04.194Z","value":0.11544360173866153},{"habit":"persistent","date":"2013-06-30T04:20:28.452Z","value":0.10900562836322933},{"habit":"imaginative","date":"2013-07-11T18:25:11.945Z","value":0.246673222258687},{"habit":"imaginative","date":"2013-02-01T05:21:31.573Z","value":0.19152919922489672},{"habit":"inquisitive","date":"2013-07-19T05:22:24.897Z","value":0.8978405426489189},{"habit":"persistent","date":"2013-03-07T15:56:09.936Z","value":0.11908329958096146},{"habit":"inquisitive","date":"2013-02-03T10:54:37.791Z","value":0.8184905100846662},{"habit":"inquisitive","date":"2013-05-06T09:33:15.712Z","value":0.8804474981734529},{"habit":"persistent","date":"2013-04-21T08:41:46.690Z","value":0.20456293306779116},{"habit":"inquisitive","date":"2013-04-08T17:57:09.720Z","value":0.8926089637447148}];

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

(function(){

	// vars
	var width = 0;
	var height = 0;
	var p;
	var currentView;
	var averageValues = {};
	var averageDates = { min: 0, max: 0, timespan: 0 };


	var howMany = 300;
	var animSpeed = 800;

	var chaosMaxRadius = 10;
	var chaosOpacity = 0.4;

	var averagesOpacity = 0.3;
	
	var detailsOpacity = 0.5;
	var maxNumberOfDetailsLabels = 12; // for 12 months
	var detailsTimeSpan = 1;
	// 1 - year
	// 2 - month
	// 3 - week
	
	var habits = [];
	var habitNames = [];
	var detailsLabels = [];
	
	// setup
	function setup(){
		var pel = $("#paper");
		width = pel.width();
		height = pel.height();
		p = new Raphael( "paper", width, height );
		
		habits = p.set();
		habitNames = p.set();
		detailsLabels = p.set();
		
		// Bindings
		$("#chaos").unbind( "click" );
		$("#averages").unbind( "click" );
		$("#detail").unbind( "click" );

		$("#chaos").click( chaos );
		$("#averages").click( averages );
		$("#details").click( details );

		/*
$("#data1").unbind( "click" );
		$("#data1").click( function(){
			loadData( habitsData1 );
		} );		
		$("#data2").unbind( "click" );
		$("#data2").click( function(){
			loadData( habitsData2 );
		} );
*/
		
		$("#year").unbind( "click" );
		$("#year").click( function(){
			loadData( habitsData1 );
			detailsTimeSpan = 1;
			//details();
		} );		
		$("#month").unbind( "click" );
		$("#month").click( function(){
			loadData( habitsData2 );
			detailsTimeSpan = 2;
			//details();
		} );		
		$("#week").unbind( "click" );
		$("#week").click( function(){
			loadData( habitsData2 );
			detailsTimeSpan = 3;
			//details();
		} );		


		
		
				
		// Create habit names & averages arrags
		for ( var i = 0; i < allHabits.length; i++ ){
			averageValues[ allHabits[i] ] = { sum: 0, med: 0, count: 0 };
			var habitName = p.text( -300, -300, allHabitsNames[i] );
			habitName.attr( {   "font-family": "Helvetica Neue, Helvetica, Arial, sans-serif", 
								"font-size": "14px", 
								"font-weight": 300,
								"fill": "#f00",
								opacity: 0});
			habitName.habit = allHabits[i];
			habitNames.push( habitName );
		}
		
		for( var i = 0; i < maxNumberOfDetailsLabels; i++ ){
			var label = p.text( -300, -300, "");
			label.attr({   "font-family": "Helvetica Neue, Helvetica, Arial, sans-serif", 
								"font-size": "14px", 
								"font-weight": 300,
								"fill": "#999",
								opacity: 0,
								"text-anchor": "middle",
								"font-size": 12});
			detailsLabels.push( label );
		}
		
		chaosMaxRadius = 0.04*width;
		
		// Create habits circles
		for( var i = 0; i < howMany; i++ ){	
			var habit = allHabits[ Math.floor( Math.random()*allHabits.length ) ];
			var value = Math.random();
			var date = new Date();
			newHabitCircle( habit, value, date );
		}
		chaos();
		//averages();
		//details();
		
		loadData( habitsData1 );
	}
	
	// New habit circle
	function newHabitCircle( habit, value, date ){
		var x = chaosMaxRadius + Math.random()*(width-2*chaosMaxRadius);
		var y = height*0.5
		var r = 0.01;

		var colour = habitColours[habit];
		
		var c = p.circle( x, y, r ).attr( { stroke: "none", fill: colour, opacity: 0 } );
		c.habit = habit;
		c.value = value;
		c.date = date;
		
		habits.push( c );
	}
	
	// Resizing
	function resizing(){
		var oldWidth = width;
		var oldHeight = height;
		width = $("#paper").width();
		height = $("#paper").height();
		
		p.setSize( width, height );
		
		var scaleX = width/oldWidth;
		var scaleY = height/oldHeight;	
		
		for( var i = 0; i < habits.length; i ++ ){
			var x = habits[i].attr("cx")*scaleX;
			var y = habits[i].attr("cy")*scaleY;
			habits[i].attr( { cx: x, cy: y } );
		}
		for( var i = 0; i < habitNames.length; i++ ){
			var x = habitNames[i].attr("x")*scaleX;
			var y = habitNames[i].attr("y")*scaleY;
			habitNames[i].attr( {x: x, y: y } );
		}
	}
	
	// Chaos visuo
	function chaos(){
		currentView = chaos;
		habitNames.animate( { opacity: 0 }, animSpeed*0.2, "<>", function(){
			detailsLabels.animate( {opacity: 0}, animSpeed*0.2, "<>", function(){
			
				var maxRX = (width*0.5-chaosMaxRadius);
				var maxRY = (height*0.5-chaosMaxRadius);
					
				for ( var i = 0; i < habits.length; i ++ ){
					var rndRX = Math.random()*maxRX;
					var rndRY = Math.random()*maxRY;
					var rndA = Math.random()*2*Math.PI;
					var x = width*0.5 + Math.cos(rndA)*rndRX;
					var y = height*0.5 + Math.sin(rndA)*rndRY;	
					var r = habits[i].value*chaosMaxRadius;
					var colour = habitColours[ habits[i].habit ];
					
					var animation = Raphael.animation( { cx: x, cy: y, r: r, "fill": colour, opacity: chaosOpacity }, animSpeed*2, "bounce" );
					var rndDelay = Math.random()*animSpeed*0.5;
					habits[i].stop().animate( animation.delay(rndDelay) );
				}
				
				for( var i = 0; i < habitNames.length; i++ ){
					var colour = habitColours[ habitNames[i].habit ];
					habitNames[i].attr( { x: chaosMaxRadius, y: chaosMaxRadius+i*20, "text-anchor": "start", "fill": colour } );
							
					var animation = Raphael.animation( { opacity: 1 }, animSpeed, "<>" );
					var rndDelay = i*200;
					habitNames[i].stop().animate( animation.delay(rndDelay) );
				}
			});
		} );
	}
	
	// Averages
	function averages(){
		currentView = averages;
		habitNames.animate( { opacity: 0 }, animSpeed*0.2, "<>", function(){
			detailsLabels.animate( {opacity: 0}, animSpeed*0.2, "<>", function(){
				averagesMaxRadius = width*0.04;
				
				var padding = width/6;
				var separation = (width-2*padding)/(allHabits.length-1);
				var maxScatter = padding*0.6;
						
				var habitsxs = {};
				var habitsscat = {};
				var centery = height*0.5;
				
				for ( var i = 0; i < habitNames.length; i++ ){
					habitsxs[ habitNames[i].habit ] = padding+(i*separation);
					habitsscat[ habitNames[i].habit ] = averageValues[ habitNames[i].habit ].med*maxScatter;
					habitNames[i].attr( {x: padding+(i*separation), 
										 y: centery, 
										 "text-anchor": "middle", 
										 "fill": "#000"} );
					var animation = Raphael.animation( { opacity: 1 }, animSpeed, "<>" );
					var rndDelay = animSpeed*0.5+(i)*(animSpeed/habitNames.length);
					habitNames[i].stop().animate( animation.delay(rndDelay) );
				}		
		
		
				for ( var i = 0; i < habits.length; i++ ){
					var rndA = Math.random()*2*Math.PI;
					
					var scatter = Math.random()*habitsscat[ habits[i].habit ];
	
					var x = habitsxs[ habits[i].habit ] + Math.cos( rndA )*scatter;
					var y = centery + Math.sin( rndA )*scatter;
					
					var r = habits[i].value*averagesMaxRadius;
					var colour = habitColours[ habits[i].habit ];
					
					var animation = Raphael.animation( { cx: x, cy: y, r: r, "fill": colour, opacity: averagesOpacity }, animSpeed, "<>" );
					var rndDelay = Math.random()*animSpeed*0.5;
					habits[i].stop().animate( animation.delay(rndDelay) );
	
				}
		
				habits.toBack();
				habitNames.toFront();
			});
		} );
	}
	
	// Details
	function details(){
		currentView = details;
		habitNames.animate( { opacity: 0 }, animSpeed*0.2, "<>", function(){
			detailsLabels.animate( {opacity: 0}, animSpeed*0.2, "<>", function(){

				var separation = height/(allHabits.length+1);
				var maxRadius = separation*0.4;					
				var habitsys = {};			
	
				var spanOneWeek = 1000*60*60*24*7;
				var spanOneMonth = spanOneWeek*4;			
				var spanOneYear = 1000*60*60*24*366; // to be continued
	
				var now = new Date();
				var then = now - spanOneYear;
				var span;
				
				var labels = 12;
				var timeSeparation = spanOneYear/labels;
				
				if( detailsTimeSpan == 2 ) {
					then = now-spanOneMonth;
					timeSeparation = spanOneMonth/labels;
				}
				if( detailsTimeSpan == 3 ) {
					then = now-spanOneWeek;
					labels = 7;
					timeSeparation = spanOneWeek/labels;
				}
				
				span = now-then;	
				for( var i = 0; i < labels; i++ ){
					var x = maxRadius + ( (width-2*maxRadius)/labels)*(i+0.5);
					var y = height-20;
					
					var date = new Date( then + ((i+1)*timeSeparation) );
	
					var dateString = "";
					if( detailsTimeSpan == 1 ) dateString = months[date.getMonth()];
					if( detailsTimeSpan == 2 ) dateString = date.getDate() + ", " + months[date.getMonth()];
					if( detailsTimeSpan == 3 ) dateString = days[date.getDay()];
					
					detailsLabels[i].attr( {x: x, y: y, text: dateString } );
	
					var animation = Raphael.animation( { opacity: 1 }, animSpeed, "<>" );
					var rndDelay = (animSpeed/20)+i*(animSpeed/labels);
					detailsLabels[i].stop().animate( animation.delay(rndDelay) );
	
				}
	
	
				
				habitNames.attr( { "fill": "#000", "text-anchor": "start" } );
				for ( var i = 0; i < habitNames.length; i++ ){			
					habitsys[ habitNames[i].habit ] = (i+1)*separation;
									
					habitNames[i].attr( { x:maxRadius, y: (i+1)*separation });
					
					var animation = Raphael.animation( { opacity: 1 }, animSpeed, "<>" );
					var rndDelay = animSpeed*0.5+(i)*(animSpeed/habitNames.length);
					habitNames[i].stop().animate( animation.delay(rndDelay) );
				}
	
				
				for ( var i = 0; i < habits.length; i++){
					var date = new Date( habits[i].date );
					date = date.getTime();
					var position = (date-then)/span;				
					
					var x = maxRadius + position*(width-2*maxRadius);
					var y = habitsys[ habits[i].habit ];
					var r = habits[i].value*maxRadius;
					var colour = habitColours[ habits[i].habit ];
					
					var animation = Raphael.animation( { cx: x, cy: y, r: r, "fill": colour, opacity: detailsOpacity }, animSpeed, "<>" );
					var rndDelay = Math.random()*animSpeed*0.5;
					habits[i].stop().animate( animation.delay(rndDelay) );
				}
				habits.toBack();
				habitNames.toFront();
			});
		});
		
	}
	
	// Load data function
	function loadData( data ){
		if ( data.length < habits.length ){
			
			var howMany = habits.length-data.length;
			var deleted = habits.splice( data.length-1, howMany );
			//deleted.remove();
			
			deleted.animate( {opacity: 0}, 500, "linear", function(){
				deleted.remove();
			});
		}

		var date = new Date(data[0].date);
		averageDates.min = date.getTime();
		averageDates.max = date.getTime();
		for( var i = 0; i < data.length; i++){		
			averageValues[ data[i].habit ].sum += data[i].value;
			averageValues[ data[i].habit ].count++;
			
			var date = new Date( data[i].date );
			var time = date.getTime();
			if ( time > averageDates.max ) averageDates.max = time;
			if ( time < averageDates.min ) averageDates.min = time;
			
			
			if( habits[i] ){
				// already exists, just change it				
				habits[i].habit = data[i].habit;
				habits[i].value = data[i].value;
				habits[i].date = data[i].date;
			} else{
				// add a new one
				newHabitCircle( data[i].habit, data[i].value, data[i].date );
			}
		}
		for( key in averageValues ){
			averageValues[key].med = averageValues[key].sum/averageValues[key].count;
		}
		averageDates.timespan = averageDates.max-averageDates.min;
		
		// Test
		/*
var min = new Date();
		min.setTime( averageDates.min );
		console.log( "Min:", min );

		var max = new Date();
		max.setTime( averageDates.max );
		console.log( "Max:", max );
*/

		
		currentView();
		
	}


	// Document ready
	$(function(){		
		setup();
		
		var TO = false;
		$(window).resize( function(){
			if ( TO !== false ) clearTimeout(TO);
			TO = setTimeout( resizing, 500 );
		} );
	});




})();