---
title: Remap CapsLock to Escape in Linux TTY
date: 2024-10-28
summary: Maybe AI is not good at it or I'm not at prompting AI for such as mall task.
---

These days I tend to ssh to my Gentoo machine more and more, so most of the time I just stay in a tty environment as root user (Yep, I like managing my packages as root user directly).  The only problem is I'd like to remap the <kbd><kbd>CapsLock</kbd></kbd> to <kbd><kbd>Escape</kbd></kbd> for better editing experience in Emacs with [Meow](https://github.com/meow-edit/meow).

## TL;DR
Jump to the last section if you are only curious about what I ended up with.

## My first attempt
The first thing that occurred to me was: let me ask Ai (in this case, Claude) to quickly walk me through mapping CapsLock to Escape in tty:

When in a tty (Linux), how can I map Caps lock to escape? {.claude-prompt}

### Claude's response:

For a TTY (virtual console) in Linux, you can use the `loadkeys` command with a custom keymap. Here's how to do it:

1. Create a temporary keymap file
   ```console
   $ cat > /tmp/caps2esc.map << 'EOF'
   keymaps 0-127
   keycode 58 = Escape
   EOF
   ```

2. Load the keymap
   ```console
   $ loadkeys /tmp/caps2esc.map
   ```

3. Optional: To make it permanent, copy to a persistent location
   ```console
   $ sudo cp /tmp/caps2esc.map /usr/local/share/kbd/keymaps/
   $ sudo loadkeys /usr/local/share/kbd/keymaps/caps2esc.map
   ```

4. Add to /etc/rc.local for persistence across reboots:
   ```console
   $ sudo loadkeys /usr/local/share/kbd/keymaps/caps2esc.map
   ```

This will immediately remap your Caps Lock key to Escape. Note that:

1.  This only works in TTY/virtual console, not in X11 or Wayland
2.  You'll need root privileges to run `loadkeys`
3.  The changes will be reset after a reboot unless you make them permanent using the commented options

Would you like me to explain any part of this in more detail?

### Reflection v1

I tried it out in a slightly different way:

1.  as the root user, create the `~/caps2esc.map` file with the suggested content
2.  `loadkyes` immediately after creating the above file

It did work but if I want to make it persistent, I need to follow the instruction in the above 2nd option.  The thing that stopped me from doing so was I didn't find a `kbd/keymaps` directory under `/usr/local/share`.  Clearly, Claude assumed that.  Since I didn't tell it which Linux distro I'm using, it's fine.


## My second attempt

Since the temporary approach worked and I didn't really create the needed directory structure just for this simple task, I was thinking the following:

As a root user, can I add the following line to my `.bash_profile` ? {.claude-prompt}

### Claude response:

No, I wouldn't recommend adding that line to .bash<sub>profile</sub> for a couple of reasons:

The `/tmp` directory is cleared on reboot, so your keymap file won't persist
loadkeys affects the entire system (all TTYs/virtual consoles), not just your session
Running loadkeys from .bash<sub>profile</sub> would try to remap keys every time you log in or open a new bash session, which could cause errors or unexpected behavior

Instead, if you want to make this permanent, I recommend either:

1. Store the keymap in a persistent location:

    ```console
    $ cp /tmp/caps2esc.map /usr/local/share/kbd/keymaps/
    ```

2. Then add the loadkeys command to `/etc/rc.local` (which runs once at boot time):

    ```console
    $ loadkeys /usr/local/share/kbd/keymaps/caps2esc.map
    ```

Or use systemd by creating a one-time service that runs at boot.

Would you like me to show you how to set up either of these permanent solutions?

### Reflection v2

Again, I didn't want to create the `/usr/share/local/kdb/keymaps/` directory just for this simple task and I did wonder why Claude kept suggesting this. Perhaps it didn't know I'm using Gentoo Linux?

## My third attempt
This time, I let it know I want to do this on a Gentoo distro:

I'm using Gnetoo Linux with OpenRC, the Wiki suggests `/etc/conf.d/keymaps`. What would you suggest? {.claude-prompt}

### Claude response

Ah yes, for Gentoo with OpenRC, using `/etc/conf.d/keymaps` is indeed the proper way! This is much better than the solutions I suggested earlier.
You have two good options:

If you want to keep your custom keymap separate:

1. Create the keymap in a persistent location

    ```console
    $ mkdir -p /usr/local/share/keymaps
    $ cp /tmp/caps2esc.map /usr/local/share/keymaps/
    ```

2. Edit `/etc/conf.d/keymaps`:
   ```
   keymap=/usr/local/share/keymaps/caps2esc
   ```

Or, simpler approach: just add the remap directive directly to your existing keymap by editing `/etc/conf.d/keymaps`:
1. Set your regular keymap

    ```
    keymap="us"  # or whatever your current keymap is
    ```

2. Add the caps lock remap

    ```
    windowkeys="yes"  # if not already set
    extended_keymaps="caps2esc"
    keymap_custom="keycode 58 = Escape"
    ```

The second approach is more "Gentoo-like" as it uses the built-in configuration system. Would you like me to explain the differences between these approaches in more detail?

### Reflection v3

This time it understands the Gentoo way but I was confused about the `keymap_custom` variable in Option 2 because, according to the [Gentoo Wiki: Keyboard layout switching](https://wiki.gentoo.org/wiki/Keyboard_layout_switching#OpenRC), there are only `keymap` and `extended_keymaps`. Also, Option 2 uses `"caps2esc"` directly without even mentioning where this keymap should be placed. I decided to let Claude check again.


## My fourth attempt

for the second approach, how does `extended_keymaps="caps2esc"` work? I don't see where the config can find the map `caps2esc` {.claude-prompt}

### Claude response

Ah, I apologize for my mistake. You're absolutely right - I included `extended_keymaps="caps2esc"` incorrectly. This setting is for loading predefined keymaps from `/usr/share/keymaps/`, and "caps2esc" isn't a standard keymap.

For your case, you only need:
```
# In /etc/conf.d/keymaps
# Set your regular keymap
keymap="us"  # or whatever your current keymap is

# Add the caps lock remap
windowkeys="yes"  # if not already set
keymap_custom="keycode 58 = Escape"
```

The `keymap_custom` variable is what you need - it allows you to specify direct keycode mappings that will be applied after your base keymap is loaded. I apologize for introducing confusion with the incorrect `extended_keymaps` setting.


### Reflection v4

Good. It seems there's no need to bother with `/usr/local/share/keymap`, but it still suggests using `key_custom` variable directly. My intuition was that if this variable is so convenient, why doesn't Gentoo Wiki even slightly hint it?  I tried out the suggestion any and it didn't work. I thought as much.

## My Final attempt

Is there a `keymap_custom` variable? Can you double check? {.claude-prompt}

### Claude response

I apologize for my confusion - you're right again. I was mistaken about the keymap `custom` variable. I should have verified this in the Gentoo documentation first.
Looking at the Gentoo Wiki and OpenRC documentation, for custom keymap modifications, the proper approach would be:

Either create a complete custom keymap file:

```console
$ mkdir -p /usr/local/share/keymaps

# Create your custom keymap based on your current one
$ dumpkeys > /usr/local/share/keymaps/personal.map
```
Edit the map to change Caps Lock to Escape: `keycode 58 = Escape`

Then in `/etc/conf.d/keymaps`:

```
keymap="/usr/local/share/keymaps/personal"
```

Or modify the keymap at boot time using a local.d script.

I apologize for my previous incorrect answers. Would you like me to explain either of these approaches in more detail?


### Reflection v5

Alright, it seems Claude was at the end of its rope. Surprised? My prompts were arguably bad too, perhaps.


## The solution

It turned out that the [Wiki](https://wiki.gentoo.org/wiki/Keyboard_layout_switching#Text-mode) already shows the correct steps, just in a confusing order.  To remap CapsLock to Escape in Linux tty, follow the below steps:

1.  Use an editor (probably Emacs, vi[m] or nano) to create a `<keymap>.map` file. `<keymap>` can be an arbitrary name but it's better to use an informative one, such as `caps2esc` in this case
2.  In the newly created file, add the following content:

    ```
    include "us.map"
    keycode  58 = Escape
    ```

3.  Compress the file and put this file under `/usr/share/keymaps/i386/qwerty/`.

    ```console
    $ gzip caps2esc.map
    $ cp caps2esc.map /usr/share/keymaps//i386/qwerty/
    ```

    Note, this is a Gentoo specific path.  Consult your distro's manual or wiki for the appropriate path.

4.  In the file `/etc/conf.d/keymaps`, use the newly created map above

    ```diff
    -keymap=""
    +keymap="caps2esc.map"
    ```

5.  Restart the keymap service. Since I'm using OpenRC:

    ```console
    rc-service keymaps restart
    rc-update add keymaps boot # redundant but harmless
    ```
By "confusing order", I mean steps 1-3 are in Section [Custom keymap](https://wiki.gentoo.org/wiki/Keyboard_layout_switching#Custom_keymap) that appears later than step 4 in Section [OpenRc](Https://wiki.gentoo.org/wiki/Keyboard_layout_switching#OpenRC).

The entire trial-and-error process reminds me of the Queen's *Raido Gaga* which sings:

> You had your time, you had the power,
> You've yet to have your finest hour.
> Raido, someone still loves you.

I'd say: Wiki, someone still loves you.
