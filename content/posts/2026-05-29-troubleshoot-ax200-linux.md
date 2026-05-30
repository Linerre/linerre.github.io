---
title: Troubleshoot Intel AX200 not detected on Arch Linux
date: 2026-05-29
summary: What the hell are you doing, Windows?
---

Prices for storage like RAM or hard drives have been roaring for a while, even though I covet the various new models shipped with Intel's 2026 Ultra chips ([ThinkPad X14][1], [Magicbook Pro 14][2], [Xiaomi Book 14][3], etc), an average price of $1600+ simply puts me off. Besides, Apple's Macbooks have never been so ridiculously affordable. But since I'm a long-term Linux user, I can still resist the temptation and thus don't convert. As a result, I turned back to old chips such as AMD 8845HS and decided to buy [SER8][4] and the necessary storage devices at an acceptable premium.

[1]: https://www.lenovo.com/sg/en/p/laptops/thinkpad/thinkpadx1/lenovo-thinkpad-x1-carbon-gen-14-aura-edition-14-inch-intel/len101t0159
[2]: https://www.honor.com/global/laptops/honor-magicbook-pro-14/
[3]: https://www.mi.com/global/product/xiaomi-book-14/
[4]: https://www.amazon.sg/Beelink-PCIe4-0-2700MHz-HDMI2-1-Display/dp/B0GLZ5VFJB

Since early 2021, I've been running Linux only on all my machines. I know what hardware to look for when purchasing a new machine. For example, I'll always prefer Intel wireless card to avoid the headache of finding barely-working open-sourced firmware for hardware that don't care much about Linux (e.g. Broadcom). This time there is no exception. SER8 ships an Intel AX200, one of my favorites (others being AX210 and AX201).

Because this time I already have a 1TB Samsung SSD with Arch Linux installed on it, I was expecting fast boot. I installed the SSD, plugged a USB installer, and started the new machine. The below error slashed among the startup logs:

```
[    3.354549] iwlwifi 0000:03:00.0: enabling device (0000 -> 0002)
[    4.024525] iwlwifi 0000:03:00.0: CSR_RESET = 0x10
[    4.025051] iwlwifi 0000:03:00.0: Host monitor block 0x0 vector 0x0
[    4.025708] iwlwifi 0000:03:00.0:     value [iter 0]: 0xc03803d0
[    4.026302] iwlwifi 0000:03:00.0:     value [iter 1]: 0xc03803d0
[    4.026874] iwlwifi 0000:03:00.0:     value [iter 2]: 0xc03803d0
[    4.027462] iwlwifi 0000:03:00.0:     value [iter 3]: 0xc03803d0
[    4.028016] iwlwifi 0000:03:00.0:     value [iter 4]: 0xc03803d0
[    4.028566] iwlwifi 0000:03:00.0:     value [iter 5]: 0xc03803d0
[    4.029108] iwlwifi 0000:03:00.0:     value [iter 6]: 0xc03803d0
[    4.029644] iwlwifi 0000:03:00.0:     value [iter 7]: 0xc03803d0
[    4.030166] iwlwifi 0000:03:00.0:     value [iter 8]: 0xc03803d0
[    4.030699] iwlwifi 0000:03:00.0:     value [iter 9]: 0xc03803d0
[    4.031213] iwlwifi 0000:03:00.0:     value [iter 10]: 0xc03803d0
[    4.031725] iwlwifi 0000:03:00.0:     value [iter 11]: 0xc03803d0
[    4.032235] iwlwifi 0000:03:00.0:     value [iter 12]: 0xc03803d0
[    4.032740] iwlwifi 0000:03:00.0:     value [iter 13]: 0xc03803d0
[    4.033238] iwlwifi 0000:03:00.0:     value [iter 14]: 0xc03803d0
[    4.033477] iwlwifi 0000:03:00.0: Host monitor block 0x0 vector 0x1
[    4.033974] iwlwifi 0000:03:00.0:     value [iter 0]: 0xc03803d0
[    4.034467] iwlwifi 0000:03:00.0:     value [iter 1]: 0xc03803d0
[    4.034955] iwlwifi 0000:03:00.0:     value [iter 2]: 0xc03803d0
[    4.035435] iwlwifi 0000:03:00.0:     value [iter 3]: 0xc03803d0
[    4.035910] iwlwifi 0000:03:00.0:     value [iter 4]: 0xc03803d0
[    4.036378] iwlwifi 0000:03:00.0:     value [iter 5]: 0xc03803d0
[    4.036842] iwlwifi 0000:03:00.0:     value [iter 6]: 0xc03803d0
[    4.037303] iwlwifi 0000:03:00.0:     value [iter 7]: 0xc03803d0
[    4.037759] iwlwifi 0000:03:00.0:     value [iter 8]: 0xc03803d0
[    4.038210] iwlwifi 0000:03:00.0:     value [iter 9]: 0xc03803d0
[    4.038660] iwlwifi 0000:03:00.0:     value [iter 10]: 0xc03803d0
[    4.039103] iwlwifi 0000:03:00.0:     value [iter 11]: 0xc03803d0
[    4.039540] iwlwifi 0000:03:00.0:     value [iter 12]: 0xc03803d0
[    4.039968] iwlwifi 0000:03:00.0:     value [iter 13]: 0xc03803d0
[    4.040394] iwlwifi 0000:03:00.0:     value [iter 14]: 0xc03803d0
[    4.040562] iwlwifi 0000:03:00.0: Host monitor block 0x0 vector 0x6
[    4.040976] iwlwifi 0000:03:00.0:     value [iter 0]: 0x00000000
[    4.041388] iwlwifi 0000:03:00.0:     value [iter 1]: 0x00000000
[    4.041797] iwlwifi 0000:03:00.0:     value [iter 2]: 0x00000000
[    4.042199] iwlwifi 0000:03:00.0:     value [iter 3]: 0x00000000
[    4.042594] iwlwifi 0000:03:00.0:     value [iter 4]: 0x00000000
[    4.042982] iwlwifi 0000:03:00.0:     value [iter 5]: 0x00000000
[    4.043366] iwlwifi 0000:03:00.0:     value [iter 6]: 0x00000000
[    4.043753] iwlwifi 0000:03:00.0:     value [iter 7]: 0x00000000
[    4.044139] iwlwifi 0000:03:00.0:     value [iter 8]: 0x00000000
[    4.044513] iwlwifi 0000:03:00.0:     value [iter 9]: 0x00000000
[    4.044882] iwlwifi 0000:03:00.0:     value [iter 10]: 0x00000000
[    4.045247] iwlwifi 0000:03:00.0:     value [iter 11]: 0x00000000
[    4.045608] iwlwifi 0000:03:00.0:     value [iter 12]: 0x00000000
[    4.045966] iwlwifi 0000:03:00.0:     value [iter 13]: 0x00000000
[    4.046324] iwlwifi 0000:03:00.0:     value [iter 14]: 0x00000000
[    4.046425] iwlwifi 0000:03:00.0: Host monitor block 0x22 vector 0x0
[    4.046786] iwlwifi 0000:03:00.0:     value [iter 0]: 0x00000000
[    4.127229] iwlwifi 0000:03:00.0: probe with driver iwlwifi failed with error -110
```

Consequently, both `ip link show` and `iwctl` didn't show the expected WIFI interface `wlan0`. A nightmare seemed to have already happened: the WIFI card is either broken or can't be detected by Linux. But how? Just a few minutes ago, I installed Windows on another Western Digital 500GB SSD, since SER8 has two PCIe NVME slots, and WIFI worked perfectly well on Windows. By that time, I didn't realize this was exactly the root cause.

I checked BIOS, asked AI, tried out a bunch of commands, no luck. I also missed the [correct solution][5]. Then with no better choice, I decided to fall back on ethernet first and realized I blacklisted the needed module `r8169` required by Realtek. Not a big deal though.

[5]: https://wiki.archlinux.org/title/Network_configuration/Wireless#Adapter_not_detected_after_booting_from_Windows

But still, I need to fix the WIFI issue. In an old-school way, I decided to google the error `probe with driver iwlwifi failed with error -110`.  This time, I found I was not alone: [<SOLVED>  iwlwifi driver failed with error -110, no Wi-Fi connectivity][6] from Mint Linux forum.  The root cause was exactly Windows fast startup. I went back to the missed clue and followed the [guide][8] mentioned in [Arch Linux Wiki][7].

[6]: https://forums.linuxmint.com/viewtopic.php?t=456864
[7]: https://wiki.archlinux.org/title/Dual_boot_with_Windows#Windows_settings
[8]: https://www.elevenforum.com/t/turn-on-or-off-fast-startup-in-windows-11.1212/

Finally, I got my WIFI card back from Windows.
