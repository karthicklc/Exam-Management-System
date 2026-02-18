import site, os
paths = site.getsitepackages() if hasattr(site, 'getsitepackages') else [site.getusersitepackages()]
print('site-packages paths:')
for p in paths:
    print('\n', p)
    if os.path.isdir(p):
        items = [f for f in os.listdir(p) if 'psycop' in f.lower()]
        print('  psycop-related:', items)
    else:
        print('  path not found')
