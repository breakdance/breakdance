# Bash Trap Command

| - | - |
| --- | --- |
| <pre>#!/bin/bash<br># bash trap command<br>trap bashtrap INT<br># bash clear screen command<br>clear;<br># bash trap function is executed when CTRL-C is pressed:<br># bash prints message => Executing bash trap subrutine !<br>bashtrap()<br>{<br> echo "CTRL+C Detected !...executing bash trap !"<br>}<br># for loop from 1/10 to 10/10<br>for a in `seq 1 10`; do<br> echo "$a/10 to Exit." <br> sleep 1;<br>done<br>echo "Exit Bash Trap Example!!!" </pre> | <br> |
