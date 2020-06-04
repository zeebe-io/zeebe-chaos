import os
import json

with open('./inventory.md', 'w') as output:
 
    output.write('\n[comment]: # (Generated document; run \'python ./scripts/inventory.py\' to generate )\n')
    output.write('# Chaos Test Inventory\n\n')

    output.write('| Experiment | Title | Description | Reliability | Availability |\n') 
    output.write('|-----|----|----|----|----|\n')

    for root, dirs, files in os.walk('./'):
        for file in files:
            if file.endswith(".json"):
                filename = os.path.join(root, file)
                with open(filename) as f:
                    data = json.load(f)
                    line = '| ' +  root +  ' | ' + data['title'] + ' | ' + data['description'] + ' | ' + data['contributions']['reliability'] + ' | ' + data['contributions']['availability'] + ' |\n' 
                    output.write(line)
