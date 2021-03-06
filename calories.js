const axios = require('axios');
const request = require('request');
var fs = require('fs');

var weightKg = null
  , totalMinutes = 0
  , activityNames = []
  , activityMETs = []
  , caloriesBurned = []
  , activityCategoryIndex = []
  , activityCategoryNames = []
  , activityNamesLowerCase = []
  , isCalculated = !1
  , totalActivityName = []
  , totalActivityMinutes = []
  , totalActivityCalories = []
  , searchActivityIndexes = null
  , numSearchResults = 0
  , currSearchStr = ""
  , isSearch = !1;

  function initActivities() {
    var a = 0;
    activityCategoryNames[a] = "Walking";
    initNewActivity("backpacking", 7, a);
    initNewActivity("backpacking, hiking or organized walking with a daypack", 7.8, a);
    initNewActivity("carrying 15 pound load (e.g. suitcase), level ground or downstairs", 5, a);
    initNewActivity("carrying 15 lb child, slow walking", 2.3, a);
    initNewActivity("carrying load upstairs, general", 8.3, a);
    initNewActivity("carrying 1 to 15 lb load, upstairs", 5, a);
    initNewActivity("carrying 16 to 24 lb load, upstairs", 6, a);
    initNewActivity("carrying 25 to 49 lb load, upstairs", 8, a);
    initNewActivity("carrying 50 to 74 lb load, upstairs", 10, a);
    initNewActivity("carrying > 74 lb load, upstairs", 12, a);
    initNewActivity("loading /unloading a car, implied walking", 3.5, a);
    initNewActivity("climbing hills, no load", 6.3, a);
    initNewActivity("climbing hills with 0 to 9 lb load", 6.5, a);
    initNewActivity("climbing hills with 10 to 20 lb load", 7.3, a);
    initNewActivity("climbing hills with 21 to 42 lb load", 8.3, a);
    initNewActivity("climbing hills with 42+ lb load", 9, a);
    initNewActivity("descending stairs", 3.5, a);
    initNewActivity("hiking, cross country", 6, a);
    initNewActivity("hiking or walking at a normal pace through fields and hillsides ", 5.3, a);
    initNewActivity("bird watching, slow walk", 2.5, a);
    initNewActivity("marching, moderate speed, military, no pack", 4.5, a);
    initNewActivity("marching rapidly, military, no pack", 8, a);
    initNewActivity("pushing or pulling stroller with child or walking with children, 2.5 to 3.1 mph", 4, a);
    initNewActivity("pushing a wheelchair, non-occupational", 3.8, a);
    initNewActivity("race walking", 6.5, a);
    initNewActivity("stair climbing, using or climbing up ladder", 8, a);
    initNewActivity("using crutches", 5, a);
    initNewActivity("walking, household", 2, a);
    initNewActivity("walking, less than 2.0 mph, level, strolling, very slow", 2, a);
    initNewActivity("walking, 2.0 mph, level, slow pace, firm surface", 2.8, a);
    initNewActivity("walking for pleasure", 3.5, a);
    initNewActivity("walking from house to car or bus, from car or bus to go places, from car or bus to and from the worksite", 2.5, a);
    initNewActivity("walking to neighbor's house or family's house for social reasons", 2.5, a);
    initNewActivity("walking the dog", 3, a);
    initNewActivity("walking, 2.5 mph, level, firm surface", 3, a);
    initNewActivity("walking, 2.5 mph, downhill", 3.3, a);
    initNewActivity("walking, 2.8 to 3.2 mph, level, moderate pace, firm surface", 3.5, a);
    initNewActivity("walking, 3.5 mph, level, brisk, firm surface, walking for exercise", 4.3, a);
    initNewActivity("walking, 2.9 to 3.5 mph, uphill, 1 to 5% grade", 5.3, a);
    initNewActivity("walking, 2.9 to 3.5 mph, uphill, 6% to 15% grade", 8, a);
    initNewActivity("walking, 4.0 mph, level, firm surface, very brisk pace", 5, a);
    initNewActivity("walking, 4.5 mph, level, firm surface, very, very brisk", 7, a);
    initNewActivity("walking, 5.0 mph, level, firm surface", 8.3, a);
    initNewActivity("walking, 5.0 mph, uphill, 3% grade", 9.8, a);
    initNewActivity("walking, for pleasure, work break", 3.5, a);
    initNewActivity("walking, grass track", 4.8, a);
    initNewActivity("walking, normal pace, plowed field or sand ", 4.5, a);
    initNewActivity("walking, to work or class", 4, a);
    initNewActivity("walking, to and from an outhouse", 2.5, a);
    initNewActivity("walking, for exercise, 3.5 to 4 mph, with ski poles, Nordic walking, level, moderate pace ", 4.8, a);
    initNewActivity("walking, for exercise, 5.0 mph, with ski poles, Nordic walking, level, fast pace ", 9.5, a);
    initNewActivity("walking, for exercise, with ski poles, Nordic walking, uphill", 6.8, a);
    initNewActivity("walking, backwards, 3.5 mph, level ", 6, a);
    initNewActivity("walking, backwards, 3.5 mph, uphill, 5% grade", 8, a);
    a++;
    activityCategoryNames[a] = "Running";
    initNewActivity("jogging, general", 7, a);
    initNewActivity("jogging, in place", 8, a);
    initNewActivity("jogging, on a mini-tramp", 4.5, a);
    initNewActivity("running, 4 mph (15 min/mile) ", 6, a);
    initNewActivity("running, 5 mph (12 min/mile)", 8.3, a);
    initNewActivity("running, 5.2 mph (11.5 min/mile)", 9, a);
    initNewActivity("running, 6 mph (10 min/mile)", 9.8, a);
    initNewActivity("running, 6.7 mph (9 min/mile)", 10.5, a);
    initNewActivity("running, 7 mph (8.5 min/mile)", 11, a);
    initNewActivity("running, 7.5 mph (8 min/mile)", 11.8, a);
    initNewActivity("running, 8 mph (7.5 min/mile)", 11.8, a);
    initNewActivity("running, 8.6 mph (7 min/mile)", 12.3, a);
    initNewActivity("running, 9 mph (6.5 min/mile)", 12.8, a);
    initNewActivity("running, 10 mph (6 min/mile)", 14.5, a);
    initNewActivity("running, 11 mph (5.5 min/mile)", 16, a);
    initNewActivity("running, 12 mph (5 min/mile) ", 19, a);
    initNewActivity("running, 13 mph (4.6 min/mile)", 19.8, a);
    initNewActivity("running, 14 mph (4.3 min/mile) ", 23, a);
    initNewActivity("running, cross country", 9, a);
    initNewActivity("running, stairs, up", 15, a);
    initNewActivity("running, on a track, team practice", 10, a);
    initNewActivity("running, training, pushing a wheelchair or baby carrier", 8, a);
    initNewActivity("running, marathon", 13.3, a);
    a++;
    activityCategoryNames[a] = "Bicycling";
    initNewActivity("bicycling, mountain, uphill, vigorous", 14, a);
    initNewActivity("bicycling, mountain, competitive, racing", 16, a);
    initNewActivity("bicycling, BMX", 8.5, a);
    initNewActivity("bicycling, mountain, general", 8.5, a);
    initNewActivity("bicycling, <10 mph, leisure, to work or for pleasure", 4, a);
    initNewActivity("bicycling, to/from work, self selected pace", 6.8, a);
    initNewActivity("bicycling, on dirt or farm road, moderate pace", 5.8, a);
    initNewActivity("bicycling, general", 7.5, a);
    initNewActivity("bicycling, leisure, 5.5 mph", 3.5, a);
    initNewActivity("bicycling, leisure, 9.4 mph", 5.8, a);
    initNewActivity("bicycling, 10-11.9 mph, leisure, slow, light effort", 6.8, a);
    initNewActivity("bicycling, 12-13.9 mph, leisure, moderate effort", 8, a);
    initNewActivity("bicycling, 14-15.9 mph, racing or leisure, fast, vigorous effort", 10, a);
    initNewActivity("bicycling, 16-19 mph, racing/not drafting or > 19 mph drafting, very fast, racing general", 12, a);
    initNewActivity("bicycling, > 20 mph, racing, not drafting", 15.8, a);
    initNewActivity("bicycling, 12 mph, seated, hands on brake hoods or bar drops, 80 rpm", 8.5, a);
    initNewActivity("bicycling, 12 mph, standing, hands on brake hoods, 60 rpm", 9, a);
    initNewActivity("unicycling", 5, a);
    a++;
    activityCategoryNames[a] = "Conditioning Exercise";
    initNewActivity("activity promoting video game (e.g., Wii Fit), light effort (e.g., balance, yoga)", 2.3, a);
    initNewActivity("activity promoting video game (e.g., Wii Fit), moderate effort (e.g., aerobic, resistance)", 3.8, a);
    initNewActivity("activity promoting video/arcade game (e.g., Exergaming, Dance Dance Revolution), vigorous effort", 7.2, a);
    initNewActivity("army type obstacle course exercise, boot camp training program", 5, a);
    initNewActivity("bicycling, stationary, general", 7, a);
    initNewActivity("bicycling, stationary, 30-50 watts, very light to light effort", 3.5, a);
    initNewActivity("bicycling, stationary, 90-100 watts, moderate to vigorous effort", 6.8, a);
    initNewActivity("bicycling, stationary, 101-160 watts, vigorous effort", 8.8, a);
    initNewActivity("bicycling, stationary, 161-200 watts, vigorous effort", 11, a);
    initNewActivity("bicycling, stationary, 201-270 watts, very vigorous effort", 14, a);
    initNewActivity("bicycling, stationary, 51-89 watts, light-to-moderate effort ", 4.8, a);
    initNewActivity("bicycling, stationary, RPM/Spin bike class ", 8.5, a);
    initNewActivity("calisthenics (e.g., push ups, sit ups, pull-ups, jumping jacks), vigorous effort", 8, a);
    initNewActivity("calisthenics (e.g., push ups, sit ups, pull-ups, lunges), moderate effort", 3.8, a);
    initNewActivity("calisthenics (e.g., situps, abdominal crunches), light effort", 2.8, a);
    initNewActivity("calisthenics, light or moderate effort, general (example: back exercises), going up & down from floor", 3.5, a);
    initNewActivity("circuit training, moderate effort", 4.3, a);
    initNewActivity("circuit training, including kettlebells, some aerobic movement with minimal rest, general, vigorous intensity", 8, a);
    initNewActivity("CurvesTM exercise routines in women", 3.5, a);
    initNewActivity("Elliptical trainer, moderate effort", 5, a);
    initNewActivity("resistance training (weight lifting - free weight, nautilus or universal-type), power lifting or body building, vigorous effort", 6, a);
    initNewActivity("resistance (weight) training, squats , slow or explosive effort", 5, a);
    initNewActivity("resistance (weight) training, multiple exercises, 8-15 repetitions at varied resistance", 3.5, a);
    initNewActivity("health club exercise, general", 5.5, a);
    initNewActivity("health club exercise classes, general, gym/weight training combined in one visit", 5, a);
    initNewActivity("health club exercise, conditioning classes", 7.8, a);
    initNewActivity("home exercise, general", 3.8, a);
    initNewActivity("stair-treadmill ergometer, general", 9, a);
    initNewActivity("rope skipping, general", 11, a);
    initNewActivity("rowing, stationary ergometer, general, vigorous effort", 6, a);
    initNewActivity("rowing, stationary, general, moderate effort", 4.8, a);
    initNewActivity("rowing, stationary, 100 watts, moderate effort", 7, a);
    initNewActivity("rowing, stationary, 150 watts, vigorous effort", 8.5, a);
    initNewActivity("rowing, stationary, 200 watts, very vigorous effort", 12, a);
    initNewActivity("ski machine, general", 6.8, a);
    initNewActivity("slide board exercise, general ", 11, a);
    initNewActivity("slimnastics, jazzercise", 6, a);
    initNewActivity("stretching, mild", 2.3, a);
    initNewActivity("pilates, general ", 3, a);
    initNewActivity("teaching exercise class (e.g., aerobic, water)", 6.8, a);
    initNewActivity("therapeutic exercise ball, Fitball exercise ", 2.8, a);
    initNewActivity("upper body exercise, arm ergometer ", 2.8, a);
    initNewActivity("upper body exercise, stationary bicycle - Airdyne (arms only) 40 rpm, moderate ", 4.3, a);
    initNewActivity("water aerobics, water calisthenics, water exercise", 5.3, a);
    initNewActivity("whirlpool, sitting", 1.3, a);
    initNewActivity("video exercise workouts, TV conditioning programs (e.g., yoga, stretching), light effort", 2.3, a);
    initNewActivity("video exercise workouts, TV conditioning programs (e.g., cardio-resistance), moderate effort", 4, a);
    initNewActivity("video exercise workouts, TV conditioning programs (e.g., cardio-resistance), vigorous effort", 6, a);
    initNewActivity("yoga, Hatha ", 2.5, a);
    initNewActivity("yoga, Power ", 4, a);
    initNewActivity("yoga, Nadisodhana ", 2, a);
    initNewActivity("yoga, Surya Namaskar", 3.3, a);
    initNewActivity("native New Zealander physical activities (e.g., Haka Powhiri, Moteatea, Waita Tira, Whakawatea, etc.) , general, moderate effort ", 5.3, a);
    initNewActivity("native New Zealander physical activities (e.g., Haka, Taiahab), general, vigorous effort", 6.8, a);
    a++;
    activityCategoryNames[a] = "Dancing";
    initNewActivity("Dancing: ballet, modern, or jazz, general, rehearsal or class", 5, a);
    initNewActivity("Dancing: ballet, modern, or jazz, performance, vigorous effort ", 6.8, a);
    initNewActivity("Dancing: tap ", 4.8, a);
    initNewActivity("Dancing: aerobic, general", 7.3, a);
    initNewActivity("Dancing: aerobic, step, with 6 - 8 inch step", 7.5, a);
    initNewActivity("Dancing: aerobic, step, with 10 - 12 inch step", 9.5, a);
    initNewActivity("Dancing: aerobic, step, with 4-inch step ", 5.5, a);
    initNewActivity("Dancing: bench step class, general ", 8.5, a);
    initNewActivity("Dancing: aerobic, low impact", 5, a);
    initNewActivity("Dancing: aerobic, high impact", 7.3, a);
    initNewActivity("Dancing: aerobic dance wearing 10-15 lb weights ", 10, a);
    initNewActivity("Dancing: ethnic or cultural dancing (e.g., Greek, Middle Eastern, hula, salsa, merengue, bamba y plena, flamenco, belly, and swing)", 4.5, a);
    initNewActivity("Dancing: ballroom, fast", 5.5, a);
    initNewActivity("Dancing: general dancing (e.g., disco, folk, Irish step dancing, line dancing, polka, contra, country)", 7.8, a);
    initNewActivity("Dancing: ballroom dancing, competitive, general ", 11.3, a);
    initNewActivity("Dancing: ballroom, slow (e.g., waltz, foxtrot, slow dancing, samba, tango, 19th century dance, mambo, cha cha)", 3, a);
    initNewActivity("Dancing: Anishinaabe Jingle Dancing", 5.5, a);
    initNewActivity("Dancing: Caribbean dance (Abakua, Beguine, Bellair, Bongo, Brukin's, Caribbean Quadrills, Dinki Mini, Gere, Gumbay, Ibo, Jonkonnu, Kumina, Oreisha, Jambu) ", 3.5, a);
    initNewActivity("Dancing: Zumba - Cumbia, American Mix", 6.5, a);
    initNewActivity("Dancing: Zumba - Merengue, Salsa", 7.3, a);
    a++;
    activityCategoryNames[a] = "Fishing & Hunting";
    initNewActivity("fishing, general", 3.5, a);
    initNewActivity("fishing, crab fishing ", 4.5, a);
    initNewActivity("fishing, catching fish with hands ", 4, a);
    initNewActivity("fishing related, digging worms, with shovel", 4.3, a);
    initNewActivity("fishing from river bank and walking", 4, a);
    initNewActivity("fishing from boat or canoe, sitting", 2, a);
    initNewActivity("fishing from river bank, standing ", 3.5, a);
    initNewActivity("fishing in stream, in waders", 6, a);
    initNewActivity("fishing, ice, sitting", 2, a);
    initNewActivity("fishing, jog or line, standing, general ", 1.8, a);
    initNewActivity("fishing, dip net, setting net and retrieving fish, general", 3.5, a);
    initNewActivity("fishing, set net, setting net and retrieving fish, general", 3.8, a);
    initNewActivity("fishing, fishing wheel, setting net and retrieving fish, general", 3, a);
    initNewActivity("fishing with a spear, standing ", 2.3, a);
    initNewActivity("hunting, bow and arrow, or crossbow", 2.5, a);
    initNewActivity("hunting, deer, elk, large game ", 6, a);
    initNewActivity("hunting large game, dragging carcass ", 11.3, a);
    initNewActivity("hunting large marine animals ", 4, a);
    initNewActivity("hunting large game, from a hunting stand, limited walking ", 2.5, a);
    initNewActivity("hunting large game from a car, plane, or boat", 2, a);
    initNewActivity("hunting, duck, wading", 2.5, a);
    initNewActivity("hunting, flying fox, squirrel ", 3, a);
    initNewActivity("hunting, general", 5, a);
    initNewActivity("hunting, pheasants or grouse ", 6, a);
    initNewActivity("hunting, birds ", 3.3, a);
    initNewActivity("hunting, rabbit, squirrel, prairie chick, raccoon, small game ", 5, a);
    initNewActivity("hunting, pigs, wild ", 3.3, a);
    initNewActivity("trapping game, general ", 2, a);
    initNewActivity("hunting, hiking with hunting gear ", 9.5, a);
    initNewActivity("pistol shooting or trap shooting, standing", 2.5, a);
    initNewActivity("rifle exercises, shooting, lying down ", 2.3, a);
    initNewActivity("rifle exercises, shooting, kneeling or standing ", 2.5, a);
    a++;
    activityCategoryNames[a] = "Home Activity";
    initNewActivity("cleaning, sweeping carpet or floors, general (housework)", 3.3, a);
    initNewActivity("cleaning, sweeping, slow, light effort (housework)", 2.3, a);
    initNewActivity("cleaning, sweeping, slow, moderate effort (housework)", 3.8, a);
    initNewActivity("cleaning, heavy or major (e.g. wash car, wash windows, clean garage), moderate effort", 3.5, a);
    initNewActivity("cleaning, mopping, standing, moderate effort (housework)", 3.5, a);
    initNewActivity("cleaning windows, washing windows, general (housework)", 3.2, a);
    initNewActivity("mopping, standing, light effort (housework)", 2.5, a);
    initNewActivity("polishing floors, standing, walking slowly, using electric polishing machine (housework)", 4.5, a);
    initNewActivity("multiple household tasks all at once, light effort", 2.8, a);
    initNewActivity("multiple household tasks all at once, moderate effort", 3.5, a);
    initNewActivity("multiple household tasks all at once, vigorous effort", 4.3, a);
    initNewActivity("cleaning, house or cabin, general, moderate effort (housework)", 3.3, a);
    initNewActivity("dusting or polishing furniture, general (housework)", 2.3, a);
    initNewActivity("kitchen activity, general, (e.g., cooking, washing dishes, cleaning up), moderate effort", 3.3, a);
    initNewActivity("cleaning, general (straightening up, changing linen, carrying out trash, light effort", 2.5, a);
    initNewActivity("wash dishes, standing or in general (not broken into stand/walk components)", 1.8, a);
    initNewActivity("wash dishes, clearing dishes from table, walking, light effort", 2.5, a);
    initNewActivity("vacuuming, general, moderate effort", 3.3, a);
    initNewActivity("butchering animals, small ", 3, a);
    initNewActivity("butchering animal, large, vigorous effort", 6, a);
    initNewActivity("cutting and smoking fish, drying fish or meat ", 2.3, a);
    initNewActivity("tanning hides, general", 4, a);
    initNewActivity("cooking or food preparation, moderate effort", 3.5, a);
    initNewActivity("cooking or food preparation - standing or sitting or in general (not broken into stand/walk components), manual appliances, light effort", 2, a);
    initNewActivity("serving food, setting table, implied walking or standing", 2.5, a);
    initNewActivity("cooking or food preparation, walking", 2.5, a);
    initNewActivity("feeding household animals", 2.5, a);
    initNewActivity("putting away groceries (e.g. carrying groceries, shopping without a grocery cart), carrying packages", 2.5, a);
    initNewActivity("carrying groceries upstairs", 7.5, a);
    initNewActivity("cooking Indian bread on an outside stove", 3, a);
    initNewActivity("food shopping with or without a grocery cart, standing or walking", 2.3, a);
    initNewActivity("non-food shopping, with or without a cart, standing or walking", 2.3, a);
    initNewActivity("ironing (housework)", 1.8, a);
    initNewActivity("knitting, sewing, light effort, wrapping presents, sitting", 1.3, a);
    initNewActivity("sewing with a machine ", 2.8, a);
    initNewActivity("laundry, fold or hang clothes, put clothes in washer or dryer, packing suitcase, washing clothes by hand, implied standing, light effort (housework)", 2, a);
    initNewActivity("laundry, hanging wash, washing clothes by hand, moderate effort (housework)", 4, a);
    initNewActivity("laundry, putting away clothes, gathering clothes to pack, putting away laundry, implied walking (housework)", 2.3, a);
    initNewActivity("making bed, changing linens (housework)", 3.3, a);
    initNewActivity("maple syruping/sugar bushing (including carrying buckets, carrying wood)", 5, a);
    initNewActivity("moving furniture, household items, carrying boxes", 5.8, a);
    initNewActivity("moving, lifting light loads", 5, a);
    initNewActivity("organizing room", 4.8, a);
    initNewActivity("scrubbing floors, on hands and knees, scrubbing bathroom, bathtub, moderate effort", 3.5, a);
    initNewActivity("scrubbing floors, on hands and knees, scrubbing bathroom, bathtub, light effort", 2, a);
    initNewActivity("scrubbing floors, on hands and knees, scrubbing bathroom, bathtub, vigorous effort", 6.5, a);
    initNewActivity("sweeping garage, sidewalk or outside of house", 4, a);
    initNewActivity("standing, packing/unpacking boxes, occasional lifting of lightweight household items, loading or unloading items in car, moderate effort", 3.5, a);
    initNewActivity("implied walking, putting away household items, moderate effort", 3, a);
    initNewActivity("watering plants", 2.5, a);
    initNewActivity("building a fire inside", 2.5, a);
    initNewActivity("moving household items upstairs, carrying boxes or furniture", 9, a);
    initNewActivity("standing, light effort tasks (pump gas, change light bulb, etc.)", 2, a);
    initNewActivity("walking, moderate effort tasks, non-cleaning (readying to leave, shut/lock doors, close windows, etc.)", 3.5, a);
    initNewActivity("sitting, playing with child(ren), light effort, only active periods", 2.2, a);
    initNewActivity("standing, playing with child(ren) light effort, only active periods", 2.8, a);
    initNewActivity("walking/running, playing with child(ren), moderate effort, only active periods", 3.5, a);
    initNewActivity("walking/running, playing with child(ren), vigorous effort, only active periods", 5.8, a);
    initNewActivity("walking and carrying small child, child weighing 15 lbs or more", 3, a);
    initNewActivity("walking and carrying small child, child weighing less than 15 lbs", 2.3, a);
    initNewActivity("standing, holding child", 2, a);
    initNewActivity("child care, infant, general ", 2.5, a);
    initNewActivity("child care, sitting/kneeling (e.g., dressing, bathing, grooming, feeding, occasional lifting of child), light effort, general", 2, a);
    initNewActivity("child care, standing (e.g., dressing, bathing, grooming, feeding, occasional lifting of child), moderate effort", 3, a);
    initNewActivity("reclining with baby", 1.5, a);
    initNewActivity("breastfeeding, sitting or reclining ", 2, a);
    initNewActivity("sit, playing with animals, light effort, only active periods", 2.5, a);
    initNewActivity("stand, playing with animals, light effort, only active periods", 2.8, a);
    initNewActivity("walk/run, playing with animals, general, light effort, only active periods", 3, a);
    initNewActivity("walk/run, playing with animals, moderate effort, only active periods", 4, a);
    initNewActivity("walk/run, playing with animals, vigorous effort, only active periods", 5, a);
    initNewActivity("standing, bathing dog", 3.5, a);
    initNewActivity("animal care, household animals, general ", 2.3, a);
    initNewActivity("elder care, disabled adult, bathing, dressing, moving into and out of bed, only active periods ", 4, a);
    initNewActivity("elder care, disabled adult, feeding, combing hair, light effort, only active periods", 2.3, a);
    a++;
    activityCategoryNames[a] = "Home Repair";
    initNewActivity("airplane repair", 3, a);
    initNewActivity("automobile body work", 4, a);
    initNewActivity("automobile repair, light or moderate effort", 3.3, a);
    initNewActivity("carpentry, general, workshop ", 3, a);
    initNewActivity("carpentry, outside house, installing rain gutters", 6, a);
    initNewActivity("carpentry, outside house, building a fence ", 3.8, a);
    initNewActivity("carpentry, finishing or refinishing cabinets or furniture", 3.3, a);
    initNewActivity("carpentry, sawing hardwood", 6, a);
    initNewActivity("carpentry, home remodeling tasks, moderate effort ", 4, a);
    initNewActivity("carpentry, home remodeling tasks, light effort ", 2.3, a);
    initNewActivity("caulking, chinking log cabin", 5, a);
    initNewActivity("caulking, except log cabin", 4.5, a);
    initNewActivity("cleaning gutters", 5, a);
    initNewActivity("excavating garage", 5, a);
    initNewActivity("hanging storm windows", 5, a);
    initNewActivity("hanging sheet rock inside house ", 5, a);
    initNewActivity("hammering nails ", 3, a);
    initNewActivity("home repair, general, light effort ", 2.5, a);
    initNewActivity("home repair, general, moderate effort ", 4.5, a);
    initNewActivity("home repair, general, vigorous effort ", 6, a);
    initNewActivity("laying or removing carpet", 4.5, a);
    initNewActivity("laying tile or linoleum,repairing appliances", 3.8, a);
    initNewActivity("repairing appliances ", 3, a);
    initNewActivity("painting, outside home ", 5, a);
    initNewActivity("painting inside house,wallpapering, scraping paint", 3.3, a);
    initNewActivity("painting", 4.5, a);
    initNewActivity("plumbing, general ", 3, a);
    initNewActivity("put on and removal of tarp - sailboat", 3, a);
    initNewActivity("roofing", 6, a);
    initNewActivity("sanding floors with a power sander", 4.5, a);
    initNewActivity("scraping and painting sailboat or powerboat", 4.5, a);
    initNewActivity("sharpening tools ", 2, a);
    initNewActivity("spreading dirt with a shovel", 5, a);
    initNewActivity("washing and waxing hull of sailboat or airplane", 4.5, a);
    initNewActivity("washing and waxing car ", 2, a);
    initNewActivity("washing fence, painting fence, moderate effort", 4.5, a);
    initNewActivity("wiring, tapping-splicing", 3.3, a);
    a++;
    activityCategoryNames[a] = "Inactivity";
    initNewActivity("lying quietly and watching television", 1, a);
    initNewActivity("lying quietly, doing nothing, lying in bed awake, listening to music (not talking or reading)", 1.3, a);
    initNewActivity("sitting quietly and watching television", 1.3, a);
    initNewActivity("sitting quietly, general", 1.3, a);
    initNewActivity("sitting quietly, fidgeting, general, fidgeting hands", 1.5, a);
    initNewActivity("sitting, fidgeting feet", 1.8, a);
    initNewActivity("sitting, smoking", 1.3, a);
    initNewActivity("sitting, listening to music (not talking or reading) or watching a movie in a theater", 1.5, a);
    initNewActivity("sitting at a desk, resting head in hands", 1.3, a);
    initNewActivity("sleeping", 0.95, a);
    initNewActivity("standing quietly, standing in a line", 1.3, a);
    initNewActivity("standing, fidgeting", 1.8, a);
    initNewActivity("reclining, writing", 1.3, a);
    initNewActivity("reclining, talking or talking on phone", 1.3, a);
    initNewActivity("reclining, reading", 1.3, a);
    initNewActivity("meditating", 1, a);
    a++;
    activityCategoryNames[a] = "Lawn & Garden";
    initNewActivity("carrying, loading or stacking wood, loading/unloading or carrying lumber, light-to-moderate effort ", 3.3, a);
    initNewActivity("carrying, loading or stacking wood, loading/unloading or carrying lumber", 5.5, a);
    initNewActivity("chopping wood, splitting logs, moderate effort", 4.5, a);
    initNewActivity("chopping wood, splitting logs, vigorous effort", 6.3, a);
    initNewActivity("clearing light brush, thinning garden, moderate effort ", 3.5, a);
    initNewActivity("clearing brush/land, undergrowth, or ground, hauling branches, wheelbarrow chores, vigorous effort", 6.3, a);
    initNewActivity("digging sandbox, shoveling sand", 5, a);
    initNewActivity("digging, spading, filling garden, composting, light-to-moderate effort", 3.5, a);
    initNewActivity("digging, spading, filling garden, compositing", 5, a);
    initNewActivity("digging, spading, filling garden, composting, vigorous effort ", 7.8, a);
    initNewActivity("driving tractor ", 2.8, a);
    initNewActivity("felling trees, large size", 8.3, a);
    initNewActivity("felling trees, small-medium size", 5.3, a);
    initNewActivity("gardening with heavy power tools, tilling a garden, chain saw", 5.8, a);
    initNewActivity("gardening, using containers, older adults > 60 years ", 2.3, a);
    initNewActivity("irrigation channels, opening and closing ports ", 4, a);
    initNewActivity("laying crushed rock", 6.3, a);
    initNewActivity("laying sod", 5, a);
    initNewActivity("mowing lawn, general", 5.5, a);
    initNewActivity("mowing lawn, riding mower ", 2.5, a);
    initNewActivity("mowing lawn, walk, hand mower ", 6, a);
    initNewActivity("mowing lawn, walk, power mower, moderate or vigorous effort", 5, a);
    initNewActivity("mowing lawn, power mower, light or moderate effort", 4.5, a);
    initNewActivity("operating snow blower, walking", 2.5, a);
    initNewActivity("planting, potting, transplanting seedlings or plants, light effort ", 2, a);
    initNewActivity("planting seedlings, shrub, stooping, moderate effort", 4.3, a);
    initNewActivity("planting crops or garden, stooping, moderate effort ", 4.3, a);
    initNewActivity("planting trees", 4.5, a);
    initNewActivity("raking lawn or leaves, moderate effort", 3.8, a);
    initNewActivity("raking lawn ", 4, a);
    initNewActivity("raking roof with snow rake", 4, a);
    initNewActivity("riding snow blower", 3, a);
    initNewActivity("sacking grass, leaves", 4, a);
    initNewActivity("shoveling dirt or mud ", 5.5, a);
    initNewActivity("shoveling snow, by hand, moderate effort ", 5.3, a);
    initNewActivity("shovelling snow, by hand ", 6, a);
    initNewActivity("shoveling snow, by hand, vigorous effort", 7.5, a);
    initNewActivity("trimming shrubs or trees, manual cutter", 4, a);
    initNewActivity("trimming shrubs or trees, power cutter, using leaf blower, edge, moderate effort", 3.5, a);
    initNewActivity("walking, applying fertilizer or seeding a lawn, push applicator", 3, a);
    initNewActivity("watering lawn or garden, standing or walking", 1.5, a);
    initNewActivity("weeding, cultivating garden, light-to-moderate effort ", 3.5, a);
    initNewActivity("weeding, cultivating garden ", 4.5, a);
    initNewActivity("weeding, cultivating garden, using a hoe, moderate-to-vigorous effort", 5, a);
    initNewActivity("gardening, general, moderate effort", 3.8, a);
    initNewActivity("picking fruit off trees, picking fruits/vegetables, moderate effort", 3.5, a);
    initNewActivity("picking fruit off trees, gleaning fruits, picking fruits/vegetables, climbing ladder to pick fruit, vigorous effort ", 4.5, a);
    initNewActivity("implied walking/standing - picking up yard, light, picking flowers or vegetables", 3.3, a);
    initNewActivity("walking, gathering gardening tools", 3, a);
    initNewActivity("wheelbarrow, pushing garden cart or wheelbarrow ", 5.5, a);
    initNewActivity("yard work, general, light effort", 3, a);
    initNewActivity("yard work, general, moderate effort", 4, a);
    initNewActivity("yard work, general, vigorous effort", 6, a);
    a++;
    activityCategoryNames[a] = "Miscellaneous";
    initNewActivity("board game playing, sitting", 1.5, a);
    initNewActivity("casino gambling, standing", 2.5, a);
    initNewActivity("card playing, sitting", 1.5, a);
    initNewActivity("chess game, sitting", 1.5, a);
    initNewActivity("copying documents, standing ", 1.5, a);
    initNewActivity("drawing, writing, painting, standing", 1.8, a);
    initNewActivity("laughing, sitting ", 1, a);
    initNewActivity("sitting, reading, book, newspaper, etc.", 1.3, a);
    initNewActivity("sitting, writing, desk work, typing", 1.3, a);
    initNewActivity("sitting, playing traditional video game, computer game ", 1, a);
    initNewActivity("standing, talking in person, on the phone, computer, or text messaging, light effort", 1.8, a);
    initNewActivity("sitting, talking in person, on the phone, computer, or text messaging, light effort", 1.5, a);
    initNewActivity("sitting, studying, general, including reading and/or writing, light effort", 1.3, a);
    initNewActivity("sitting, in class, general, including note-taking or class discussion", 1.8, a);
    initNewActivity("standing, reading", 1.8, a);
    initNewActivity("standing, miscellaneous", 2.5, a);
    initNewActivity("sitting, arts and crafts, carving wood, weaving, spinning wool, light effort", 1.8, a);
    initNewActivity("sitting, arts and crafts, carving wood, weaving, spinning wool, moderate effort", 3, a);
    initNewActivity("standing, arts and crafts, sand painting, carving, weaving, light effort", 2.5, a);
    initNewActivity("standing, arts and crafts, sand painting, carving, weaving, moderate effort", 3.3, a);
    initNewActivity("standing, arts and crafts, sand painting, carving, weaving, vigorous effort", 3.5, a);
    initNewActivity("retreat/family reunion activities involving sitting, relaxing, talking, eating", 1.8, a);
    initNewActivity("retreat/family reunion activities involving playing games with children", 3, a);
    initNewActivity("touring/traveling/vacation involving riding in a vehicle", 2, a);
    initNewActivity("touring/traveling/vacation involving walking", 3.5, a);
    initNewActivity("camping involving standing, walking, sitting, light-to-moderate effort", 2.5, a);
    initNewActivity("sitting at a sporting event, spectator", 1.5, a);
    a++;
    activityCategoryNames[a] = "Music Playing";
    initNewActivity("Music Playng: accordion, sitting", 1.8, a);
    initNewActivity("Music Playng: cello, sitting", 2.3, a);
    initNewActivity("Music Playng: conducting orchestra, standing", 2.3, a);
    initNewActivity("Music Playng: double bass, standing ", 2.5, a);
    initNewActivity("Music Playng: drums, sitting", 3.8, a);
    initNewActivity("Music Playng: drumming (e.g., bongo, conga, benbe), moderate, sitting", 3, a);
    initNewActivity("Music Playng: flute, sitting", 2, a);
    initNewActivity("Music Playng: horn, standing", 1.8, a);
    initNewActivity("Music Playng: piano, sitting", 2.3, a);
    initNewActivity("Music Playng: playing musical instruments, general ", 2, a);
    initNewActivity("Music Playng: organ, sitting ", 2, a);
    initNewActivity("Music Playng: trombone, standing", 3.5, a);
    initNewActivity("Music Playng: trumpet, standing", 1.8, a);
    initNewActivity("Music Playng: violin, sitting", 2.5, a);
    initNewActivity("Music Playng: woodwind, sitting", 1.8, a);
    initNewActivity("Music Playng: guitar, classical, folk, sitting", 2, a);
    initNewActivity("Music Playng: guitar, rock and roll band, standing", 3, a);
    initNewActivity("Music Playng: marching band, baton twirling, walking, moderate pace, general", 4, a);
    initNewActivity("Music Playng: marching band, playing an instrument, walking, brisk pace, general ", 5.5, a);
    initNewActivity("Music Playng: marching band, drum major, walking", 3.5, a);
    a++;
    activityCategoryNames[a] = "Occupation";
    initNewActivity("Occupation: active workstation, treadmill desk, walking ", 2.3, a);
    initNewActivity("Occupation: airline flight attendant ", 3, a);
    initNewActivity("Occupation: bakery, general, moderate effort", 4, a);
    initNewActivity("Occupation: bakery, light effort", 2, a);
    initNewActivity("Occupation: bookbinding", 2.3, a);
    initNewActivity("Occupation: building road, driving heavy machinery", 6, a);
    initNewActivity("Occupation: building road, directing traffic, standing", 2, a);
    initNewActivity("Occupation: carpentry, general, light effort ", 2.5, a);
    initNewActivity("Occupation: carpentry, general, moderate effort", 4.3, a);
    initNewActivity("Occupation: carpentry, general, heavy or vigorous effort ", 7, a);
    initNewActivity("Occupation: carrying heavy loads (e.g., bricks, tools)", 8, a);
    initNewActivity("Occupation: carrying moderate loads up stairs, moving boxes 25-49 lbs", 8, a);
    initNewActivity("Occupation: chambermaid, hotel housekeeper, making bed, cleaning bathroom, pushing cart", 4, a);
    initNewActivity("Occupation: coal mining, drilling coal, rock", 5.3, a);
    initNewActivity("Occupation: coal mining, erecting supports", 5, a);
    initNewActivity("Occupation: coal mining, general", 5.5, a);
    initNewActivity("Occupation: coal mining, shoveling coal", 6.3, a);
    initNewActivity("Occupation: cook, chef", 2.5, a);
    initNewActivity("Occupation: construction, outside, remodeling, new structures (e.g., roof repair, miscellaneous", 4, a);
    initNewActivity("Occupation: custodial work, light effort (e.g., cleaning sink and toilet, dusting, vacuuming, light cleaning)", 2.3, a);
    initNewActivity("Occupation: custodial work, moderate effort (e.g., electric buffer, feathering arena floors, mopping, taking out trash, vacuuming)", 3.8, a);
    initNewActivity("Occupation: driving delivery truck, taxi, shuttle bus, school bus", 2, a);
    initNewActivity("Occupation: electrical work (e.g., hook up wire, tapping-splicing)", 3.3, a);
    initNewActivity("Occupation: engineer (e.g., mechanical or electrical)", 1.8, a);
    initNewActivity("Occupation: farming, vigorous effort (e.g., baling hay, cleaning barn) ", 7.8, a);
    initNewActivity("Occupation: farming, moderate effort (e.g., feeding animals, chasing cattle by walking and/or horseback, spreading manure, harvesting crops)", 4.8, a);
    initNewActivity("Occupation: farming, light effort (e.g., cleaning animal sheds, preparing animal feed) ", 2, a);
    initNewActivity("Occupation: farming, driving tasks (e.g., driving tractor or harvester)", 2.8, a);
    initNewActivity("Occupation: farming, feeding small animals", 3.5, a);
    initNewActivity("Occupation: farming, feeding cattle, horses", 4.3, a);
    initNewActivity("Occupation: farming, hauling water for animals, general hauling water", 4.3, a);
    initNewActivity("Occupation: farming, taking care of animals (e.g., grooming, brushing, shearing sheep, assisting with birthing, medical care, branding), general", 4.5, a);
    initNewActivity("Occupation: farming, rice, planting, grain milling activities", 3.8, a);
    initNewActivity("Occupation: farming, milking by hand, cleaning pails, moderate effort", 3.5, a);
    initNewActivity("Occupation: farming, milking by machine, light effort", 1.3, a);
    initNewActivity("Occupation: fire fighter, general", 8, a);
    initNewActivity("Occupation: fire fighter, rescue victim, automobile accident, using pike pole", 6.8, a);
    initNewActivity("Occupation: fire fighter, raising and climbing ladder with full gear, simulated fire suppression", 8, a);
    initNewActivity("Occupation: fire fighter, hauling hoses on ground, carrying/hoisting equipment, breaking down walls, wearing full gear", 9, a);
    initNewActivity("Occupation: fishing, commercial, light effort", 3.5, a);
    initNewActivity("Occupation: fishing, commercial, moderate effort", 5, a);
    initNewActivity("Occupation: fishing, commercial, vigorous effort", 7, a);
    initNewActivity("Occupation: forestry, ax chopping, very fast, 1.25 kg axe, 51 blows/min, extremely vigorous effort", 17.5, a);
    initNewActivity("Occupation: forestry, ax chopping, slow, 1.25 kg axe, 19 blows/min, moderate effort", 5, a);
    initNewActivity("Occupation: forestry, ax chopping, fast, 1.25 kg axe, 35 blows/min, vigorous effort", 8, a);
    initNewActivity("Occupation: forestry, moderate effort (e.g., sawing wood with power saw, weeding, hoeing)", 4.5, a);
    initNewActivity("Occupation: forestry, vigorous effort (e.g., barking, felling, or trimming trees, carrying or stacking logs, felling trees, planting seeds, sawing lumber by hand )", 8, a);
    initNewActivity("Occupation: furriery", 4.5, a);
    initNewActivity("Occupation: garbage collector, walking, dumping bins into truck", 4, a);
    initNewActivity("Occupation: hairstylist (e.g., plaiting hair, manicure, make-up artist)", 1.8, a);
    initNewActivity("Occupation: horse grooming, including feeding, cleaning stalls, bathing, brushing, clipping, longeing and exercising horses.", 7.3, a);
    initNewActivity("Occupation: horse, feeding, watering, cleaning stalls, implied walking and lifting loads", 4.3, a);
    initNewActivity("Occupation: horse racing, galloping", 7.3, a);
    initNewActivity("Occupation: horse racing, trotting", 5.8, a);
    initNewActivity("Occupation: horse racing, walking", 3.8, a);
    initNewActivity("Occupation: kitchen maid ", 3, a);
    initNewActivity("Occupation: lawn keeper, yard work, general", 4, a);
    initNewActivity("Occupation: laundry worker", 3.3, a);
    initNewActivity("Occupation: locksmith", 3, a);
    initNewActivity("Occupation: machine tooling (e.g., machining, working sheet metal, machine fitter, operating lathe, welding) light-to-moderate effort", 3, a);
    initNewActivity("Occupation: machine tooling, operating punch press, moderate effort", 5, a);
    initNewActivity("Occupation: manager, property", 1.8, a);
    initNewActivity("Occupation: manual or unskilled labor, general, light effort ", 2.8, a);
    initNewActivity("Occupation: manual or unskilled labor, general, moderate effort", 4.5, a);
    initNewActivity("Occupation: manual or unskilled labor, general, vigorous effort", 6.5, a);
    initNewActivity("Occupation: masonry, concrete, moderate effort", 4.3, a);
    initNewActivity("Occupation: masonry, concrete, light effort ", 2.5, a);
    initNewActivity("Occupation: massage therapist, standing", 4, a);
    initNewActivity("Occupation: moving, carrying or pushing heavy objects, 75 lbs or more, only active time (e.g., desks, moving van work)", 7.5, a);
    initNewActivity("Occupation: skindiving or SCUBA diving as a frogman, Navy Seal", 12, a);
    initNewActivity("Occupation: operating heavy duty equipment, automated, not driving", 2.5, a);
    initNewActivity("Occupation: orange grove work, picking fruit", 4.5, a);
    initNewActivity("Occupation: painting,house, furniture, moderate effort", 3.3, a);
    initNewActivity("Occupation: plumbing activities ", 3, a);
    initNewActivity("Occupation: printing, paper industry worker, standing", 2, a);
    initNewActivity("Occupation: police, directing traffic, standing", 2.5, a);
    initNewActivity("Occupation: police, driving a squad car, sitting", 2.5, a);
    initNewActivity("Occupation: police, riding in a squad car, sitting", 1.3, a);
    initNewActivity("Occupation: police, making an arrest, standing", 4, a);
    initNewActivity("Occupation: postal carrier, walking to deliver mail", 2.3, a);
    initNewActivity("Occupation: shoe repair, general", 2, a);
    initNewActivity("Occupation: shoveling, digging ditches", 7.8, a);
    initNewActivity("Occupation: shoveling, more than 16 pounds/minute, deep digging, vigorous effort", 8.8, a);
    initNewActivity("Occupation: shoveling, less than 10 pounds/minute, moderate effort", 5, a);
    initNewActivity("Occupation: shoveling, 10 to 15 pounds/minute, vigorous effort", 6.5, a);
    initNewActivity("Occupation: sitting tasks, light effort (e.g., office work, chemistry lab work, computer work, light assembly repair, watch repair, reading, desk work)", 1.5, a);
    initNewActivity("Occupation: sitting meetings, light effort, general, and/or with talking involved (e.g., eating at a business meeting)", 1.5, a);
    initNewActivity("Occupation: sitting tasks, moderate effort (e.g., pushing heavy levers, riding mower/forklift, crane operation)", 2.5, a);
    initNewActivity("Occupation: sitting, teaching stretching or yoga, or light effort exercise class", 2.8, a);
    initNewActivity("Occupation: standing tasks, light effort (e.g., bartending, store clerk, assembling, filing, duplicating, librarian, putting up a Christmas tree, standing and talking at work, changing clothes when teaching physical education,standing)", 3, a);
    initNewActivity("Occupation: standing, light/moderate effort (e.g., assemble/repair heavy parts, welding,stocking parts,auto repair,standing, packing boxes, nursing patient care)", 3, a);
    initNewActivity("Occupation: standing, moderate effort, lifting items continuously, 10 \u2013 20 lbs, with limited walking or resting", 4.5, a);
    initNewActivity("Occupation: standing, moderate effort, intermittent lifting 50 lbs, hitch/twisting ropes", 3.5, a);
    initNewActivity("Occupation: standing, moderate/heavy tasks (e.g., lifting more than 50 lbs, masonry, painting, paper hanging)", 4.5, a);
    initNewActivity("Occupation: steel mill, moderate effort (e.g., fettling, forging, tipping molds)", 5.3, a);
    initNewActivity("Occupation: steel mill, vigorous effort (e.g., hand rolling, merchant mill rolling, removing slag, tending furnace)", 8.3, a);
    initNewActivity("Occupation: tailoring, cutting fabric", 2.3, a);
    initNewActivity("Occupation: tailoring, general", 2.5, a);
    initNewActivity("Occupation: tailoring, hand sewing", 1.8, a);
    initNewActivity("Occupation: tailoring, machine sewing", 2.5, a);
    initNewActivity("Occupation: tailoring, pressing", 3.5, a);
    initNewActivity("Occupation: tailoring, weaving, light effort (e.g., finishing operations, washing, dyeing, inspecting cloth, counting yards, paperwork)", 2, a);
    initNewActivity("Occupation: tailoring, weaving, moderate effort (e.g., spinning and weaving operations, delivering boxes of yam to spinners, loading of warp bean, pinwinding, conewinding, warping, cloth cutting)", 4, a);
    initNewActivity("Occupation: truck driving, loading and unloading truck, tying down load, standing, walking and carrying heavy loads", 6.5, a);
    initNewActivity("Occupation: typing, electric, manual or computer", 1.3, a);
    initNewActivity("Occupation: using heavy power tools such as pneumatic tools (e.g., jackhammers, drills)", 6.3, a);
    initNewActivity("Occupation: using heavy tools (not power) such as shovel, pick, tunnel bar, spade", 8, a);
    initNewActivity("Occupation: walking on job, less than 2.0 mph, very slow speed, in office or lab area", 2, a);
    initNewActivity("Occupation: walking on job, 3.0 mph, in office, moderate speed, not carrying anything", 3.5, a);
    initNewActivity("Occupation: walking on job, 3.5 mph, in office, brisk speed, not carrying anything", 4.3, a);
    initNewActivity("Occupation: walking on job, 2.5 mph, slow speed and carrying light objects less than 25 pounds", 3.5, a);
    initNewActivity("Occupation: walking, gathering things at work, ready to leave", 3, a);
    initNewActivity("Occupation: walking, 2.5 mph, slow speed, carrying heavy objects more than 25 lbs", 3.8, a);
    initNewActivity("Occupation: walking, 3.0 mph, moderately and carrying light objects less than 25 lbs", 4.5, a);
    initNewActivity("Occupation: walking, pushing a wheelchair", 3.5, a);
    initNewActivity("Occupation: walking, 3.5 mph, briskly and carrying objects less than 25 pounds", 4.8, a);
    initNewActivity("Occupation: walking or walk downstairs or standing, carrying objects about 25 to 49 pounds", 5, a);
    initNewActivity("Occupation: walking or walk downstairs or standing, carrying objects about 50 to 74 pounds", 6.5, a);
    initNewActivity("Occupation: walking or walk downstairs or standing, carrying objects about 75 to 99 pounds", 7.5, a);
    initNewActivity("Occupation: walking or walk downstairs or standing, carrying objects about 100 pounds or over", 8.5, a);
    initNewActivity("Occupation: working in scene shop, theater actor, backstage employee", 3, a);
    a++;
    activityCategoryNames[a] = "Self Care";
    initNewActivity("getting ready for bed, general, standing", 2.3, a);
    initNewActivity("sitting on toilet, eliminating while standing or squating", 1.8, a);
    initNewActivity("bathing, sitting", 1.5, a);
    initNewActivity("dressing, undressing, standing or sitting", 2.5, a);
    initNewActivity("eating, sitting", 1.5, a);
    initNewActivity("talking and eating or eating only, standing", 2, a);
    initNewActivity("taking medication, sitting or standing", 1.5, a);
    initNewActivity("grooming, washing hands, shaving,  brushing teeth, putting on make-up, sitting or standing", 2, a);
    initNewActivity("hairstyling, standing", 2.5, a);
    initNewActivity("having hair or nails done by someone else, sitting", 1.3, a);
    initNewActivity("showering, toweling off, standing", 2, a);
    a++;
    activityCategoryNames[a] = "Sexual Activity";
    initNewActivity("Sexual Activity: active, vigorous effort", 2.8, a);
    initNewActivity("Sexual Activity: general, moderate effort", 1.8, a);
    initNewActivity("Sexual Activity: passive, light effort, kissing, hugging", 1.3, a);
    a++;
    activityCategoryNames[a] = "Sports";
    initNewActivity("Alaska Native Games, Eskimo Olympics, general ", 5.5, a);
    initNewActivity("archery, non-hunting", 4.3, a);
    initNewActivity("badminton, competitive", 7, a);
    initNewActivity("badminton, social singles and doubles, general", 5.5, a);
    initNewActivity("basketball, game", 8, a);
    initNewActivity("basketball, non-game, general", 6, a);
    initNewActivity("basketball, general ", 6.5, a);
    initNewActivity("basketball, officiating", 7, a);
    initNewActivity("basketball, shooting baskets", 4.5, a);
    initNewActivity("basketball, drills, practice ", 9.3, a);
    initNewActivity("basketball, wheelchair", 7.8, a);
    initNewActivity("billiards", 2.5, a);
    initNewActivity("bowling", 3, a);
    initNewActivity("bowling, indoor, bowling alley ", 3.8, a);
    initNewActivity("boxing, in ring, general", 12.8, a);
    initNewActivity("boxing, punching bag", 5.5, a);
    initNewActivity("boxing, sparring", 7.8, a);
    initNewActivity("broomball", 7, a);
    initNewActivity("children's games, adults playing (e.g., hopscotch, 4-square, dodge ball, playground apparatus, t-ball, tetherball, marbles, jacks, arcade games), moderate effort", 5.8, a);
    initNewActivity("cheerleading, gymnastic moves, competitive ", 6, a);
    initNewActivity("coaching, football, soccer, basketball, baseball, swimming, etc.", 4, a);
    initNewActivity("coaching, actively playing sport with players ", 8, a);
    initNewActivity("cricket, batting, bowling, fielding", 4.8, a);
    initNewActivity("croquet", 3.3, a);
    initNewActivity("curling", 4, a);
    initNewActivity("darts, wall or lawn", 2.5, a);
    initNewActivity("drag racing, pushing or driving a car", 6, a);
    initNewActivity("auto racing, open wheel", 8.5, a);
    initNewActivity("fencing", 6, a);
    initNewActivity("football, competitive", 8, a);
    initNewActivity("football, touch, flag, general", 8, a);
    initNewActivity("football, touch, flag, light effort", 4, a);
    initNewActivity("football or baseball, playing catch", 2.5, a);
    initNewActivity("frisbee playing, general", 3, a);
    initNewActivity("frisbee, ultimate", 8, a);
    initNewActivity("golf, general", 4.8, a);
    initNewActivity("golf, walking, carrying clubs", 4.3, a);
    initNewActivity("golf, miniature, driving range", 3, a);
    initNewActivity("golf, walking, pulling clubs ", 5.3, a);
    initNewActivity("golf, using power cart", 3.5, a);
    initNewActivity("gymnastics, general", 3.8, a);
    initNewActivity("hacky sack", 4, a);
    initNewActivity("handball, general", 12, a);
    initNewActivity("handball, team", 8, a);
    initNewActivity("high ropes course, multiple elements", 4, a);
    initNewActivity("hang gliding", 3.5, a);
    initNewActivity("hockey, field", 7.8, a);
    initNewActivity("hockey, ice, general", 8, a);
    initNewActivity("hockey, ice, competitive", 10, a);
    initNewActivity("horseback riding, general", 5.5, a);
    initNewActivity("horse chores, feeding, watering, cleaning stalls, implied walking and lifting loads ", 4.3, a);
    initNewActivity("saddling, cleaning, grooming, harnessing and unharnessing horse", 4.5, a);
    initNewActivity("horseback riding, trotting", 5.8, a);
    initNewActivity("horseback riding, canter or gallop ", 7.3, a);
    initNewActivity("horseback riding,walking", 3.8, a);
    initNewActivity("horseback riding, jumping ", 9, a);
    initNewActivity("horse cart, driving, standing or sitting", 1.8, a);
    initNewActivity("horseshoe pitching, quoits", 3, a);
    initNewActivity("jai alai", 12, a);
    initNewActivity("martial arts, different types, slower pace, novice performers, practice", 5.3, a);
    initNewActivity("martial arts, different types, moderate pace (e.g., judo, jujitsu, karate, kick boxing, tae kwan do, tai-bo, Muay Thai boxing)", 10.3, a);
    initNewActivity("juggling", 4, a);
    initNewActivity("kickball", 7, a);
    initNewActivity("lacrosse", 8, a);
    initNewActivity("lawn bowling, bocce ball, outdoor ", 3.3, a);
    initNewActivity("moto-cross, off-road motor sports, all-terrain vehicle, general", 4, a);
    initNewActivity("orienteering", 9, a);
    initNewActivity("paddleball, competitive", 10, a);
    initNewActivity("paddleball, casual, general", 6, a);
    initNewActivity("polo, on horseback", 8, a);
    initNewActivity("racquetball, competitive", 10, a);
    initNewActivity("racquetball, general", 7, a);
    initNewActivity("rock or mountain climbing", 8, a);
    initNewActivity("rock climbing, ascending rock, high difficulty", 7.5, a);
    initNewActivity("rock climbing, ascending or traversing rock, low-to-moderate difficulty ", 5.8, a);
    initNewActivity("rock climbing, rappelling", 5, a);
    initNewActivity("rodeo sports, general, light effort", 4, a);
    initNewActivity("rodeo sports, general, moderate effort", 5.5, a);
    initNewActivity("rodeo sports, general, vigorous effort", 7, a);
    initNewActivity("rope jumping, fast pace, 120-160 skips/min", 12.3, a);
    initNewActivity("rope jumping, moderate pace, 100-120 skips/min, general, 2 foot skip, plain bounce", 11.8, a);
    initNewActivity("rope jumping, slow pace, < 100 skips/min, 2 foot skip, rhythm bounce", 8.8, a);
    initNewActivity("rugby, union, team, competitive", 8.3, a);
    initNewActivity("rugby, touch, non-competitive", 6.3, a);
    initNewActivity("shuffleboard", 3, a);
    initNewActivity("skateboarding, general, moderate effort", 5, a);
    initNewActivity("skateboarding, competitive, vigorous effort ", 6, a);
    initNewActivity("skating, roller", 7, a);
    initNewActivity("rollerblading, in-line skating, 14.4 km/h (9.0 mph), recreational pace", 7.5, a);
    initNewActivity("rollerblading, in-line skating, 17.7 km/h (11.0 mph), moderate pace, exercise training", 9.8, a);
    initNewActivity("rollerblading, in-line skating, 21.0 to 21.7 km/h (13.0 to 13.6 mph), fast pace, exercise training", 12.3, a);
    initNewActivity("rollerblading, in-line skating, 24.0 km/h (15.0 mph), maximal effort", 14, a);
    initNewActivity("skydiving, base jumping, bungee jumping ", 3.5, a);
    initNewActivity("soccer, competitive", 10, a);
    initNewActivity("soccer, casual, general", 7, a);
    initNewActivity("softball or baseball, fast or slow pitch, general", 5, a);
    initNewActivity("softball, practice ", 4, a);
    initNewActivity("softball, officiating", 4, a);
    initNewActivity("softball,pitching", 6, a);
    initNewActivity("sports spectator, very excited, emotional, physically moving ", 3.3, a);
    initNewActivity("squash", 12, a);
    initNewActivity("squash, general ", 7.3, a);
    initNewActivity("table tennis, ping pong", 4, a);
    initNewActivity("tai chi, qi gong, general", 3, a);
    initNewActivity("tai chi, qi gong, sitting, light effort", 1.5, a);
    initNewActivity("tennis, general", 7.3, a);
    initNewActivity("tennis, doubles", 6, a);
    initNewActivity("tennis, doubles", 4.5, a);
    initNewActivity("tennis, singles", 8, a);
    initNewActivity("tennis, hitting balls, non-game play, moderate effort ", 5, a);
    initNewActivity("trampoline, recreational", 3.5, a);
    initNewActivity("trampoline, competitive", 4.5, a);
    initNewActivity("volleyball", 4, a);
    initNewActivity("volleyball, competitive, in gymnasium", 6, a);
    initNewActivity("volleyball, non-competitive, 6 - 9 member team, general", 3, a);
    initNewActivity("volleyball, beach, in sand", 8, a);
    initNewActivity("wrestling (one match = 5 minutes)", 6, a);
    initNewActivity("wallyball, general", 7, a);
    initNewActivity("track and field (e.g., shot, discus, hammer throw)", 4, a);
    initNewActivity("track and field (e.g., high jump, long jump, triple jump, javelin, pole vault)", 6, a);
    initNewActivity("track and field (e.g., steeplechase, hurdles)", 10, a);
    a++;
    activityCategoryNames[a] = "Transportation";
    initNewActivity("automobile or light truck (not a semi) driving", 2.5, a);
    initNewActivity("riding in a car or truck", 1.3, a);
    initNewActivity("riding in a bus or train", 1.3, a);
    initNewActivity("flying airplane or helicopter", 1.8, a);
    initNewActivity("motor scooter, motorcycle", 3.5, a);
    initNewActivity("pulling rickshaw ", 6.3, a);
    initNewActivity("pushing plane in and out of hangar", 6, a);
    initNewActivity("truck, semi, tractor, > 1 ton, or bus, driving", 2.5, a);
    initNewActivity("walking for transportation, 2.8-3.2 mph, level, moderate pace, firm surface ", 3.5, a);
    a++;
    activityCategoryNames[a] = "Water Activities";
    initNewActivity("boating, power, driving", 2.5, a);
    initNewActivity("boating, power, passenger, light ", 1.3, a);
    initNewActivity("canoeing, on camping trip", 4, a);
    initNewActivity("canoeing, harvesting wild rice, knocking rice off the stalks", 3.3, a);
    initNewActivity("canoeing, portaging", 7, a);
    initNewActivity("canoeing, rowing, 2.0-3.9 mph, light effort", 2.8, a);
    initNewActivity("canoeing, rowing, 4.0-5.9 mph, moderate effort", 5.8, a);
    initNewActivity("canoeing, rowing, kayaking, competition, >6 mph, vigorous effort", 12.5, a);
    initNewActivity("canoeing, rowing, for pleasure, general", 3.5, a);
    initNewActivity("canoeing, rowing, in competition, or crew or sculling", 12, a);
    initNewActivity("diving, springboard or platform", 3, a);
    initNewActivity("kayaking, moderate effort", 5, a);
    initNewActivity("paddle boat", 4, a);
    initNewActivity("sailing, boat and board sailing, windsurfing, ice sailing, general", 3, a);
    initNewActivity("sailing, in competition", 4.5, a);
    initNewActivity("sailing, Sunfish/Laser/Hobby Cat, Keel boats, ocean sailing, yachting, leisure", 3.3, a);
    initNewActivity("skiing, water or wakeboarding", 6, a);
    initNewActivity("jet skiing, driving, in water", 7, a);
    initNewActivity("skindiving, fast", 15.8, a);
    initNewActivity("skindiving, moderate", 11.8, a);
    initNewActivity("skindiving, scuba diving, general", 7, a);
    initNewActivity("snorkeling", 5, a);
    initNewActivity("surfing, body or board, general", 3, a);
    initNewActivity("surfing, body or board, competitive", 5, a);
    initNewActivity("paddle boarding, standing", 6, a);
    initNewActivity("swimming laps, freestyle, fast, vigorous effort", 9.8, a);
    initNewActivity("swimming laps, freestyle, front crawl, slow, light or moderate effort", 5.8, a);
    initNewActivity("swimming, backstroke, general, training or competition", 9.5, a);
    initNewActivity("swimming, backstroke, recreational", 4.8, a);
    initNewActivity("swimming, breaststroke, general, training or competition", 10.3, a);
    initNewActivity("swimming, breaststroke, recreational ", 5.3, a);
    initNewActivity("swimming, butterfly, general", 13.8, a);
    initNewActivity("swimming, crawl, fast speed, ~75 yards/minute, vigorous effort", 10, a);
    initNewActivity("swimming, crawl, medium speed, ~50 yards/minute, vigorous effort", 8.3, a);
    initNewActivity("swimming, lake, ocean, river", 6, a);
    initNewActivity("swimming, leisurely, not lap swimming, general", 6, a);
    initNewActivity("swimming, sidestroke, general", 7, a);
    initNewActivity("swimming, synchronized", 8, a);
    initNewActivity("swimming, treading water, fast, vigorous effort", 9.8, a);
    initNewActivity("swimming, treading water, moderate effort, general", 3.5, a);
    initNewActivity("tubing, floating on a river, general", 2.3, a);
    initNewActivity("water aerobics, water calisthenics", 5.5, a);
    initNewActivity("water polo", 10, a);
    initNewActivity("water volleyball", 3, a);
    initNewActivity("water jogging", 9.8, a);
    initNewActivity("water walking, light effort, slow pace", 2.5, a);
    initNewActivity("water walking, moderate effort, moderate pace", 4.5, a);
    initNewActivity("water walking, vigorous effort, brisk pace", 6.8, a);
    initNewActivity("whitewater rafting, kayaking, or canoeing", 5, a);
    initNewActivity("windsurfing, not pumping for speed", 5, a);
    initNewActivity("windsurfing or kitesurfing, crossing trial", 11, a);
    initNewActivity("windsurfing, competition, pumping for speed", 13.5, a);
    a++;
    activityCategoryNames[a] = "Winter Activtities";
    initNewActivity("dog sledding, mushing ", 7.5, a);
    initNewActivity("dog sledding, passenger ", 2.5, a);
    initNewActivity("moving ice house, set up/drill holes", 6, a);
    initNewActivity("ice fishing, sitting ", 2, a);
    initNewActivity("skating, ice dancing", 14, a);
    initNewActivity("skating, ice, 9 mph or less", 5.5, a);
    initNewActivity("skating, ice, general", 7, a);
    initNewActivity("skating, ice, rapidly, more than 9 mph, not competitive", 9, a);
    initNewActivity("skating, speed, competitive", 13.3, a);
    initNewActivity("ski jumping, climb up carrying skis", 7, a);
    initNewActivity("skiing, general", 7, a);
    initNewActivity("skiing, cross country, 2.5 mph, slow or light effort, ski walking", 6.8, a);
    initNewActivity("skiing, cross country, 4.0-4.9 mph, moderate speed and effort, general", 9, a);
    initNewActivity("skiing, cross country, 5.0-7.9 mph, brisk speed, vigorous effort", 12.5, a);
    initNewActivity("skiing, cross country, >8.0 mph, elite skier, racing", 15, a);
    initNewActivity("skiing, cross country, hard snow, uphill, maximum, snow mountaineering", 15.5, a);
    initNewActivity("skiing, cross-country, skating ", 13.3, a);
    initNewActivity("skiing, cross-country, biathlon, skating technique ", 13.5, a);
    initNewActivity("skiing, downhill, alpine or snowboarding, light effort, active time only", 4.3, a);
    initNewActivity("skiing, downhill, alpine or snowboarding, moderate effort, general, active time only", 5.3, a);
    initNewActivity("skiing, downhill, vigorous effort, racing", 8, a);
    initNewActivity("skiing, roller, elite racers", 12.5, a);
    initNewActivity("sledding, tobogganing, bobsledding, luge", 7, a);
    initNewActivity("snow shoeing, moderate effort", 5.3, a);
    initNewActivity("snow shoeing, vigorous effort", 10, a);
    initNewActivity("snowmobiling, driving, moderate", 3.5, a);
    initNewActivity("snowmobiling, passenger", 2, a);
    initNewActivity("snow shoveling, by hand, moderate effort", 5.3, a);
    initNewActivity("snow shoveling, by hand, vigorous effort", 7.5, a);
    initNewActivity("snow blower, walking and pushing", 2.5, a);
    a++;
    activityCategoryNames[a] = "Religious Activities";
    initNewActivity("sitting in church, in service, attending a ceremony, sitting quietly", 1.3, a);
    initNewActivity("sitting, playing an instrument at church", 2, a);
    initNewActivity("sitting in church, talking or singing, attending a ceremony, sitting, active participation", 1.8, a);
    initNewActivity("sitting, reading religious materials at home", 1.3, a);
    initNewActivity("standing quietly in church, attending a ceremony", 1.3, a);
    initNewActivity("standing, singing in church, attending a ceremony, standing, active participation", 2, a);
    initNewActivity("kneeling in church or at home, praying", 1.3, a);
    initNewActivity("standing, talking in church", 1.8, a);
    initNewActivity("walking in church", 2, a);
    initNewActivity("walking, less than 2.0 mph, very slow", 2, a);
    initNewActivity("walking, 3.0 mph, moderate speed, not carrying anything", 3.5, a);
    initNewActivity("walking, 3.5 mph, brisk speed, not carrying anything", 4.3, a);
    initNewActivity("walk/stand combination for religious purposes, usher", 2, a);
    initNewActivity("praise with dance or run, spiritual dancing in church", 5, a);
    initNewActivity("serving food at church", 2.5, a);
    initNewActivity("preparing food at church", 2, a);
    initNewActivity("washing dishes, cleaning kitchen at church", 3.3, a);
    initNewActivity("eating at church", 1.5, a);
    initNewActivity("eating/talking at church or standing eating, American Indian Feast days", 2, a);
    initNewActivity("cleaning church", 3.3, a);
    initNewActivity("general yard work at church", 4, a);
    initNewActivity("standing, moderate effort (e.g., lifting heavy objects, assembling at fast rate)", 3.5, a);
    initNewActivity("standing, moderate-to-heavy effort, manual labor, lifting \u2265 50 lbs, heavy maintenance", 4.5, a);
    initNewActivity("typing, electric, manual, or computer", 1.3, a);
    a++;
    activityCategoryNames[a] = "Volunteer Activities";
    initNewActivity("Volunteer Activities: sitting, meeting, general, and/or with talking involved", 1.5, a);
    initNewActivity("Volunteer Activities: sitting, light office work, in general", 1.5, a);
    initNewActivity("Volunteer Activities: sitting, moderate work", 2.5, a);
    initNewActivity("Volunteer Activities: standing, light work (filing, talking, assembling)", 2.3, a);
    initNewActivity("Volunteer Activities: sitting, child care, only active periods", 2, a);
    initNewActivity("Volunteer Activities: standing, child care, only active periods", 3, a);
    initNewActivity("Volunteer Activities: walk/run play with children, moderate, only active periods", 3.5, a);
    initNewActivity("Volunteer Activities: walk/run play with children, vigorous, only active periods", 5.8, a);
    initNewActivity("Volunteer Activities: standing, light/moderate work (e.g., pack boxes, assemble/repair, set up chairs/furniture)", 3, a);
    initNewActivity("Volunteer Activities: standing, moderate (lifting 50 lbs., assembling at fast rate)", 3.5, a);
    initNewActivity("Volunteer Activities: standing, moderate/heavy work", 4.5, a);
    initNewActivity("Volunteer Activities: typing, electric, manual, or computer", 1.3, a);
    initNewActivity("Volunteer Activities: walking, less than 2.0 mph, very slow", 2, a);
    initNewActivity("Volunteer Activities: walking, 3.0 mph, moderate speed, not carrying anything", 3.5, a);
    initNewActivity("Volunteer Activities: walking, 3.5 mph, brisk speed, not carrying anything", 4.3, a);
    initNewActivity("Volunteer Activities: walking, 2.5 mph slowly and carrying objects less than 25 pounds", 3.5, a);
    initNewActivity("Volunteer Activities: walking, 3.0 mph moderately and carrying objects less than 25 pounds, pushing something", 4.5, a);
    initNewActivity("Volunteer Activities: walking, 3.5 mph, briskly and carrying objects less than 25 pounds", 4.8, a);
    initNewActivity("Volunteer Activities: walk/stand combination, for volunteer purposes", 3, a);
    //document.getElementById("activityTable").innerHTML = getActivityTableHTML()
}

function initNewActivity(a, b, c) {
    var d = activityNames.length;
    activityNames[d] = a;
    activityNamesLowerCase[d] = a.trim().toLowerCase();
    activityMETs[d] = b;
    activityCategoryIndex[d] = c
}

initActivities();

function calculateCaloriesBurned(weight, minutes) {
        var a = 0;
        weightKg = weight;
        totalMinutes = minutes;
        for (a = a = 0; a < activityMETs.length; a++)
            caloriesBurned[a] = activityMETs[a] * weightKg * (totalMinutes / 60);
}

/*
activities: list of activities as Strings
weight: int, weight in kilos
calories: int

Return a json-object
*/
function getActivities(data, calories) {
    // console.log(data);
    var activities = data['favoriteActivities'];
    var weight = data['weight'];
    calculateCaloriesBurned(weight, 30)

    var data = []

    for (b = 0; b < activities.length; b++) {
        var index = activityNames.indexOf(activities[b])
        var minutes = Math.round(calories / activityMETs[index])

        data.push(activity = {
            name: activities[b],
            calories: calories,
            minutes: minutes
        })
    }

    return data
}


var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

var apiURL = config.BLUEMIX_SERVER_URL;
var appId = config.NUTRITIONIX_APP_ID;
var appKey = config.NUTRITIONIX_APP_KEY;

/*
You need to add your own nutritionix api id and key for this function to work!
*/
function getActivityFromFood(weight, favoriteActivities, food, portions) {
    var callback = {};
    callback.func = function(callbackData, calories) {
        console.log(getActivities(callbackData, calories));
    }
    callback.data = {
        'weight': weight,
        'favoriteActivities': favoriteActivities
    }
    // console.log(callback.data);
    getCalories(food, portions, callback.func, callback.data);
}

function getCalories(food, portions, callback, callbackData) {
    let query = portions + " " + food

    let data = {
      "query":query,
      "timezone":"US/Eastern"
    }
    let headers = {
      'Content-Type': 'application/json',
      'x-app-id': appId,
      'x-app-key': appKey
    }

    axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients', data, {headers: headers})
    .then(function (response) {
        var calories = response.data.foods[0].nf_calories
        callback(callbackData, calories);
        // console.log(getActivities(favoriteActivities, weight, calories))
    })
    .catch(function (error) {
        console.log(error);
    });
}

var profile = JSON.parse(fs.readFileSync('profile.json', 'utf8'));

function testGetActivityFromFood() {
    // var weight = 50
    var food = 'white bread'
    //var favoriteActivities = activityNames

    getActivityFromFood(profile.weight, profile.favoriteActivities, food, 2)
}

var body = JSON.parse(fs.readFileSync('data.json', 'utf8'));

itemList = body["data"]["classes"];
var maxScore = 0;
var item = null;
for (var i = 0; i < itemList.length; i++) {
    if (maxScore < itemList[i]["score"]) {
        maxScore = itemList[i]["score"];
        item = itemList[i]
    }
}
console.log(item);
var portion = JSON.parse(fs.readFileSync('portion.json', 'utf8'));
getActivityFromFood(profile.weight, profile.favoriteActivities, item.class, portion.value);


// var filepath = __dirname + '/orange.jpg';
// function uploadImage(filepath) {
//     var url = apiURL + 'uploadpic';

//     const formData = {
//         myPhoto: fs.createReadStream(filepath)
//     };

//     const options = {
//       url: url,
//       formData: formData
//     };

//     request.post(options, function optionalCallback(err, res, body) {
//         if (err) {
//             return console.error('upload failed:', err);
//         }

//         if (!body["data"]) {
//             console.log(body);
//             uploadImage(filepath);
//             return;
//             // body = {
//             //     "data": {
//             //         "classifier_id": "food",
//             //         "name": "food",
//             //         "classes": [
//             //             {
//             //                 "class": "bun",
//             //                 "score": 0.784,
//             //                 "type_hierarchy": "/bread/bun"
//             //             },
//             //             {
//             //                 "class": "bread",
//             //                 "score": 0.811
//             //             },
//             //             {
//             //                 "class": "hamburger bun",
//             //                 "score": 0.5,
//             //                 "type_hierarchy": "/bread/bun/hamburger bun"
//             //             }
//             //         ]
//             //     }
//             // }
//         }

//         // console.log(body);

//         itemList = body["data"]["classes"];
//         var maxScore = 0;
//         var item = null;
//         for (var i = 0; i < itemList.length; i++) {
//             if (maxScore < itemList[i]["score"]) {
//                 maxScore = itemList[i]["score"];
//                 item = itemList[i]
//             }
//         }
//         console.log(item);
//         getActivityFromFood(profile.weight, profile.favoriteActivities, item.class, 1);
//     });
// }

// uploadImage(filepath);

// console.log(res);

// testGetActivityFromFood();