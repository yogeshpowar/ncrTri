# Choose best two weekends based participant's 

The script will help organisers to pick two best weekends
based on the availability of participants.

The script expects in the format similar to `ncrTri.csv` this can
be created by providing the google form.

Then this node.js script traverse through non-availability inputs
and convert it to available one and then traverse through all 
the combination of weekends to find the best pair which covers
most participants.

### To run
```
./run.sh
```
### Output
```
$ ./run.sh 
Total athletes: 19
------------------------
The best fit options are
Weekends of Saturday, 16th November and Sunday, 17th November
Weekends of Saturday, 7th December and Sunday, 8th December
This will leave out 0 athlete/s
------------------------

The next best options are
Weekends of Saturday, 16th November and Sunday, 17th November
Weekends of Saturday, 23th November and Sunday, 24th November
This will leave out 1 athlete/s
------------------------

```
