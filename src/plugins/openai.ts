// eslint-disable-next-line complexity
export const div = (name, node) => {
  if (!name.endsWith(':before')) return;

  const names = [
    'param-name',
    'param-type',
    'param-reqd',
    'param-default',
    'param-optl',
    'param-row-header'
  ];

  if (node.attribs?.class?.some(name => names.includes(name))) {
    node.inline = true;

    for (const child of node.nodes) {
      child.inline = true;
    }
  }

  if (node.attribs?.class?.includes('param-row-header')) {
    for (const child of node.nodes) {
      if (child.attribs?.class?.includes('api-ref-anchor-link')) {
        continue;
      }

      if (child.nodes) {
        for (const grandChild of child.nodes) {
          if (grandChild.type === 'text') {
            switch (child.attribs.class[0]) {
              case 'param-name':

                if (grandChild.value && !grandChild.value.includes('Name:')) {
                  grandChild.value = `\n\n- Name: \`${grandChild.value}\``;
                }
                break;
              case 'param-default':
                if (grandChild.value && !grandChild.value.includes('Default:')) {
                  grandChild.value = `\n- Default: \`${grandChild.value}\``;
                }
                console.log('param-default', grandChild.value);
                break;
              case 'param-type':
                if (grandChild.value && !grandChild.value.includes('Type:')) {
                  grandChild.value = `\n- Type: \`${grandChild.value}\``;
                }
                break;

              case 'param-optl':
              case 'param-reqd':
                if (grandChild.value && !grandChild.value.includes('**')) {
                  grandChild.value = ` **${grandChild.value}**`;
                }
                break;

              default: {
                console.error('UNAHNDLED', child.attribs.class);
                break;
              }
            }

          }
        }

      } else {
        child.value = '';
      }
    }
  }
};
