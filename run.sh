#!/bin/bash
#set -x

file=ncrTri.csv
tmp=_tmp_out.log
tmp1=_tmp_out1.log

cat $file | sed -s 's/,"/#/g' | sed -s 's/",/#/g' > $tmp

j=1;

for i in "Not available on Saturday, 16th November" "Not available on Sunday, 17th November" "Not available on Saturday, 23th November" "Not available on Sunday, 24th November" "Not available on Saturday, 30th November" "Not available on Sunday, 1st December" "Not available on Saturday, 7th December" "Not available on Sunday, 8th December" "Not available on Saturday, 14th December" "Not available on Sunday, 15th December"
do
	str="s/"$i"/"$j"/g"
	cat $tmp | sed -s "$str" > $tmp1
    cp $tmp1 $tmp
	((j++))
done

cat $tmp | cut -d',' -f3- > $tmp1
cp $tmp1 $tmp && rm $tmp1

echo "name#na#format" > $tmp1
tail -$((`wc -l $tmp | cut -d' ' -f1` - 1)) $tmp >> $tmp1

cp $tmp1 $tmp && rm $tmp1

dos2unix -q $tmp

node index.js
