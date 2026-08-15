---
title: "Computer Networks Complete Notes"
videoUrl: ""
lastUpdated: "2026-08-15"
---

# Computer Networks — Complete Notes

*Based on Kunal Kushwaha's network interview prep course*

---

## 1. Basic Definitions

- **Computer** — a device that processes and stores data.
- **Network** — a group of computers connected together to share data/resources.
- **Internet** — a huge collection of interconnected computer networks (a "network of networks"), connected globally.

---

## 2. History of the Internet

- **1957** — Russia (USSR) launched the first artificial satellite, **Sputnik**.
- In response, the US formed **ARPA (Advanced Research Projects Agency)** to stay ahead in technology and research.
- ARPA developed **ARPANET**, which initially connected **4 locations** so they could communicate using early networking protocols.
- Over time, more locations/nodes were added to the network.
- **Protocol** = a set of rules and regulations that devices follow while sending/receiving data. Every step of communication follows these rules. Protocols are standardized/maintained by bodies like the **IETF (Internet Engineering Task Force)** and the **Internet Society**.

### The Documents Problem → WWW

- As more info got shared, there was a need to organize and link documents.
- **Tim Berners-Lee** developed the **WWW (World Wide Web)** — a network of online content formatted in **HTML** and accessed via **HTTP**. It refers to all interlinked HTML pages accessible over the internet.
- ⚠️ Yahoo was **not** the first search engine — Yahoo (1994) started as a web *directory*. Earlier tools include **Archie** (1990, FTP files) and **Wandex** (1993, early web search engine).

---

## 3. How the Web Works (Client-Server Model)

- **Client** — the user's device; sends a **request** to a server.
- **Server** — receives the request and sends back a **response**.
- Example: typing `google.com` → your device (client) sends a request → Google's server sends back the response → the webpage opens.
- Physically, the internet runs through cables — including **undersea/submarine cables** across ocean floors connecting continents. (See the "Submarine Cable Map" website for real routes.)

---

## 4. Protocols

| Protocol | Full Form | Description |
|---|---|---|
| **TCP** | Transmission Control Protocol | Ensures data reaches the receiver completely and correctly (reliable, ordered delivery) |
| **UDP** | User Datagram Protocol | Low-latency, loss-tolerant delivery — data may not arrive 100% intact. Used when speed > perfection (video calls, live streaming) |
| **HTTP** | HyperText Transfer Protocol | Defines the format of data transferred between client and server (WWW runs on this) |

---

## 5. How Data Travels

- Data is broken into **packets** and transmitted across the network.
- **IP Address** — a unique address identifying a device on a network so it can connect and exchange data. Format: `x.x.x.x`, each `x` from 0–255. Typing `google.com` resolves to a particular IP.
- Command: `curl ifconfig.me -s` → shows your **public IP address**.

### Path from device → internet

```
Your Device → Router/Modem (Local IP) → ISP (gives router a Global/Public IP) → Internet
```

- The **ISP** gives your router a **global/public IP address**.
- The router assigns each connected device a **local/private IP address**, using **DHCP** (Dynamic Host Configuration Protocol).
- When you request `google.com`, Google's server sees the router's **global IP**, not your device's local IP.
- When the response comes back, the router figures out *which device* asked for it using **NAT (Network Address Translation)**.

### Ports

- An IP address identifies the **device**; a **port number** identifies which **application** on that device the data is meant for.
- Example: WhatsApp chat and a WhatsApp video call use the same IP (same device) but **different ports**.
- Ports are **16-bit numbers** → total possible ports = 2¹⁶ = **65,536** (0–65,535).

| Range | Category | Example |
|---|---|---|
| 0 – 1023 | Well-known / reserved ports | HTTP → 80, HTTPS → 443 |
| 1024 – 49151 | Registered ports (specific apps) | MongoDB → 27017, MySQL, SQL Server → 1433 |
| 49152 – 65535 | Dynamic / private (ephemeral) ports | Temporary, general use |

---

## 6. Speed & Data Transfer

- **Upload** — sending data from your computer to another computer/server.
- **Download** — receiving data from another computer/server.

**Speed units:**
- 1 bit = a single 0 or 1
- 1 Kbps = 10³ bits/sec
- 1 Mbps = 10⁶ bits/sec
- 1 Gbps = 10⁹ bits/sec

---

## 7. Types of Communication Media

1. **Guided (Wired) Media** — data travels through a single physical path.
   - Examples: optical fiber cables, coaxial cables.
2. **Unguided (Wireless) Media** — no fixed path; signals travel through open air.
   - Short range: Wi-Fi, Bluetooth
   - Long range: 3G, 4G, LTE, radio channels

---

## 8. Types of Networks (by Area Covered)

| Type | Full Form | Coverage | Example |
|---|---|---|---|
| **LAN** | Local Area Network | Single building/campus | Home network, office, computer labs |
| **MAN** | Metropolitan Area Network | Across a city | City-wide cable TV/network |
| **WAN** | Wide Area Network | Across countries/continents, uses optical fiber | The Internet itself |

- **Internet** = a collection of many WANs/networks connected together.

### WAN — 2 Types
1. **SONET** (Synchronous Optical Networking) — optical fiber backbone for large-area, high-speed links.
2. **Frame Relay** — connects LANs over a wider area (packet-switching technology).

---

## 9. Modem vs Router

| Device | Function |
|---|---|
| **Modem** | Converts **digital ↔ analog** signals so data can travel over telephone/cable lines to your ISP |
| **Router** | Routes data **packets** to the correct destination based on **IP address** |

---

## 10. Network Topologies

*(Physical/logical arrangement of computers in a network)*

| Topology | How it works | Limitations |
|---|---|---|
| **Bus** | All computers connected via a single backbone cable; one device sends at a time | Cable break = whole network down |
| **Ring** | Computers connected in a circle, data passes node to node | Cable break disrupts the ring; unnecessary hops |
| **Star** | All devices connected to one central hub/switch | Central device failure = network down |
| **Tree** | Combination of Star + Bus | Inherits limitations of both, but more fault-tolerant |
| **Mesh** | Every computer directly connected to every other | Expensive, huge cabling, poor scalability |

---

## 11. OSI Model (Open System Interconnection)

> A standard reference model defining how two or more devices communicate, split into **7 layers**.

**Golden rule:** Each layer does its own job and assumes the layer below will handle the rest.

### The 7 Layers (Top → Bottom)

| # | Layer | Key Job |
|---|---|---|
| 1 | **Application** | User-facing software; data enters here. Uses HTTP |
| 2 | **Presentation** | Converts data to machine format — encoding, encryption, compression, translation. Uses SSL/TLS |
| 3 | **Session** | Sets up, manages, tears down sessions; handles authentication & authorization |
| 4 | **Transport** | Breaks data into **segments**; adds port number, sequence number, checksum. TCP = connection-oriented (reliable), UDP = connectionless (fast) |
| 5 | **Network** | Logical addressing (IP address); segments → **packets**; routers live here. Uses routing algorithms like Dijkstra's (used in OSPF) |
| 6 | **Data Link** | Physical addressing (MAC address); packet → **frame**. MAC = 12 hex digits (48-bit). Handles MAC and error detection |
| 7 | **Physical** | Actual hardware layer; transmits raw **bits** over cables/radio waves |

📌 **Data flow:** Sending side goes **Application → Physical** (top to bottom), wrapping data at each layer (**encapsulation**). Receiving side goes **Physical → Application** (bottom to top), unwrapping at each layer (**decapsulation**).

**Mnemonic:** *"All People Seem To Need Data Processing"* → Application, Presentation, Session, Transport, Network, Data Link, Physical.

---

## 12. TCP/IP Model

> The **Internet Protocol Suite**, developed by ARPA/DARPA. The **most widely used** model in practice (OSI is more theoretical).

**5 Layers:**

| # | Layer |
|---|---|
| 1 | Application |
| 2 | Transport |
| 3 | Network |
| 4 | Data Link |
| 5 | Physical |

*(Some textbooks merge Data Link + Physical into "Network Access," making it a 4-layer model.)*

---

## 13. Application Layer

- Where the **user directly interacts** — browsers, WhatsApp, etc.
- Command: `ping google.com` — sends test packets to check connectivity. Default ICMP ping packet on Linux = **64 bytes total** (56 data + 8 header), each carrying a sequence number.
- A **collection of servers** = a **Data Center** — large numbers of computers with static IPs and high-speed connections.

### Client-Server Architecture
```
Client ────── Request ──────▶ Server
       ◀───── Response ──────
```

### P2P (Peer-to-Peer) Network
- **No dedicated central server** — the key difference from client-server.
- Every device (**peer**) acts as **both client and server** simultaneously.
- Decentralized, scales rapidly. Example: BitTorrent.

---

## 14. Networking Devices

| Device | Layer | Function |
|---|---|---|
| **Repeater** | Physical | Regenerates a weak signal bit-by-bit to extend distance. 2-port device |
| **Hub** | Physical | Multi-port repeater; no intelligence, broadcasts to all ports. Types: Active (boosts signal), Passive (just splits) |
| **Bridge** | Data Link | Smarter repeater — filters traffic by reading source/destination MAC address |
| **Switch** | Data Link | Multi-port bridge; does error checking, forwards only good packets to the right port (efficient) |
| **Gateway** | — | Connects two different networks, even with different protocols/models |
| **Brouter** | — | Combines Bridge + Router — can filter LAN traffic (bridge) or route across networks (router) |

---

## 15. Protocols by Category

### TCP-based (connection-oriented, reliable)

| Protocol | Full Form | Use |
|---|---|---|
| **HTTP** | HyperText Transfer Protocol | Web browsing |
| **DHCP** | Dynamic Host Configuration Protocol | Auto-assigns local IP addresses to devices |
| **FTP** | File Transfer Protocol | Transferring files |
| **SMTP** | Simple Mail Transfer Protocol | Sending email |
| **POP3 / IMAP** | Post Office Protocol / Internet Message Access Protocol | Receiving email |
| **SSH** | Secure Shell | Secure remote terminal access (encrypted) |
| **VNC** | Virtual Network Computing | Remote graphical desktop access |
| **Telnet** | — | Remote host access, unencrypted, port 23 |

### UDP-based (connectionless, fast, may lose data)
- Used where speed matters more than perfect reliability.
- Examples: video calls, live streaming, **DNS**, gaming.

---

## 16. Process vs Thread

| Term | Meaning | Example |
|---|---|---|
| **Process** | An independent running program with its own memory | Sending a message, recording a video |
| **Thread** | A lightweight sub-task within a process; shares memory with other threads in that process | Opening camera *within* a messaging app |

💡 One process can have multiple threads running inside it.

---

## 17. Sockets

> An **interface** between an application and the network — allows two processes (same or different machines) to send/receive data over a connection.

- Used whenever data is shared between computers over a network.
- Sockets are tied to **port numbers** so the transport layer knows which application data is coming from/going to.

---

## 18. Ephemeral Ports

> Short-lived, temporary ports automatically assigned to the **client side** of a connection (from the dynamic range, 49152–65535) for the duration of one session.

---

## 19. HTTP (HyperText Transfer Protocol)

- A **client-server protocol** — defines how requests and responses are exchanged.
- Application Layer protocol; runs on top of **TCP** for reliable delivery.
- **Stateless** — each request is independent; server doesn't remember previous requests (hence cookies/sessions exist).

### HTTP Methods

| Method | Purpose |
|---|---|
| **GET** | Retrieve/request data from server |
| **POST** | Send/submit data to server (e.g., username, password) |
| **PUT** | Update/replace data at a specific location |
| **DELETE** | Remove data from the server |

### HTTP Status Codes

| Range | Category | Examples |
|---|---|---|
| **1xx** | Informational | — |
| **2xx** | Success | `200 OK` |
| **3xx** | Redirection | — |
| **4xx** | Client Error | `400 Bad Request`, `404 Not Found` |
| **5xx** | Server Error | `500 Internal Server Error` (generic, used when no other code fits) |

---

## 20. Cookies

- A small unique string of data, **stored in the browser** on the client's device (not the cloud).
- First visit → server sends a cookie → browser stores it locally.
- Next visit → browser sends the cookie back in the request headers → server recognizes the user and personalizes the response (e.g., stays logged in), checking its database for that state.
- Cookies have an **expiration date**.
- **Third-party cookies** — set by a domain *other than* the one being visited (e.g., an advertiser on a news site) — used for cross-site tracking/ads.

---

## 21. Email Protocols

**Sending** → **SMTP** (Simple Mail Transfer Protocol)
**Receiving** → **POP3** or **IMAP**
Email uses **TCP** as its transport layer protocol.

### Sending Flow (Different Providers)

Example: Yahoo → Gmail:
```
Sender → Sender's SMTP Server → Receiver's SMTP Server → Receiver
```
- Same provider on both ends → no extra hop needed.
- If the receiver's server is offline, the sender's SMTP server **retries automatically** until success or timeout.
- Command: `nslookup -type=mx gmail.com` → shows the domain's **MX (Mail Exchange)** records.

### POP3 (Post Office Protocol)
- Client connects via **TCP, port 110**.
- Client authorizes → server transfers all emails (typically downloads and removes from server).
```
Client ── Authorize ──▶ POP Server
       ◀── Transfer ───
```

### IMAP (Internet Message Access Protocol)
- Lets you view/access email across **multiple devices** — mail stays synced on the server instead of being downloaded and removed.

---

## 22. DNS (Domain Name System)

- A **directory/database of servers** — the internet's phonebook.
- Main job: **translate a domain name into its IP address**.

### Domain Structure

Example: `mail.google.com`

| Part | Name |
|---|---|
| `mail` | Subdomain |
| `google` | Second-level domain |
| `.com` | Top-Level Domain (TLD) |

### TLD Examples

| TLD | Meaning |
|---|---|
| `.com` | Commercial |
| `.edu` | Education |
| `.org` | Organization |
| `.in`, `.uk` | Country-specific (ccTLD) |

- Top-level domains are managed globally by **ICANN**.
- You **cannot buy a domain outright** — you **rent/register** it for a period (e.g., yearly) via a registrar.
- Command: `dig google.com` → detailed DNS record lookup.
- DNS operates at the **Application Layer**, but commonly uses **UDP** as its transport protocol.

### DNS Resolution Process
1. Browser checks its own **cache** first.
2. If not found, checks the **OS cache**.
3. If still not found, query goes out to a **DNS resolver**, which checks the **Root DNS Server**.
4. Root server points to the correct **TLD server** (e.g., `.com`).
5. TLD server points to the authoritative server, which returns the IP → browser connects.

---

## 23. What Happens When You Hit Enter on a URL

Example URL: `http://example.com/product/electric/phone`

| Component | Meaning |
|---|---|
| `http` | Scheme — tells the browser which protocol to use (`https` = encrypted) |
| `example.com` | Domain name |
| `/product/electric` | Path |
| `/phone` | Resource |

**Steps:**
1. Browser looks up the domain's IP in its own cache → then OS cache → then queries the DNS resolver if needed (chain of requests until resolved).
2. Once the browser has the IP, it establishes a **TCP connection** with the server.
3. Browser sends an **HTTP request** over that TCP connection.
4. Server processes the request and sends back a **response**.
5. Browser receives the response and **renders** the content.

---

## 24. Transport Layer (Deep Dive)

- Moves information (messages) between the network and the application layer, and vice versa.
- Has a **multiplexer**: if you're sending a message, a file, and doing a video call at the same time, all three streams are combined for transmission; a **demultiplexer** on the receiving end splits them back out to the correct application.
- Each application talks to the transport layer via a **socket**, tied to a **port number**, so data reaches the right application.
- Also handles **congestion control**.

### Checksum
- Sender calculates a string value from the data using an algorithm and sends both.
- Receiver recalculates the checksum from the data it received and compares.
- Match → data is correct/complete. Mismatch → data is corrupted.

### Timers & Sequence Numbers
- Sending a packet starts a **timer**; it stops when an acknowledgment (ACK) arrives.
- If the timer **expires** before an ACK, the sender assumes the packet was lost and **resends** it.
- Problem: the original packet might have arrived fine, but the ACK got lost — causing the sender to needlessly resend (duplicate packets).
- Solved using **sequence numbers**, so duplicates can be identified and discarded.

### UDP (User Datagram Protocol)
- Connectionless; data may not be delivered fully, may be out of order, or may be corrupted.
- Uses checksum to detect corruption but takes **no action** to fix it.
- UDP packet contains: Data, Source port, Destination port, Length, Checksum.
- Use cases: very fast, video conferencing, DNS, gaming.

### TCP (Transmission Control Protocol)
- Segments large chunks of raw data from the application layer.
- Provides **congestion control**, tracks lost/out-of-order data via **sequence numbers**.

**Features of TCP:**
1. Connection-oriented
2. Error control
3. Congestion control
4. Bidirectional (full duplex)
5. Only one TCP connection between two computers at a time

### TCP 3-Way Handshake
1. **SYN** — Client sends a segment with a SYN flag, telling the server it wants to start communication and what sequence number it will begin with.
2. **SYN + ACK** — Server responds, acknowledging the client's request and sending its own starting sequence number.
3. **ACK** — Client acknowledges the server's response. Connection is now established and reliable data transfer begins.

---

## 25. Network Layer (Deep Dive)

- Where **routers** operate.
- Multiple routers can exist between source and destination, each with its own network address.
- When a packet reaches a router, the router checks its **forwarding table** to decide where to send it next — this is **hop-by-hop forwarding**, continuing until the packet reaches its destination.
- Example: in `192.168.2.30` → `192.168.2` is the network address, `.30` is the device address.

### Control Plane
- Builds the routing tables. Each router = a node in a graph; connections between routers = edges.
- **Static routing** — addresses added manually, not adaptive.
- **Dynamic routing** — adapts automatically to network changes, using algorithms like **Bellman-Ford** and **Dijkstra's**.

### Internet Protocol (IP)
- Network layer protocol; the IP address uniquely identifies a device.
- **IPv4** = 32-bit, written as 4 numbers (words), each 8 bits (4 × 8 = 32).
- **IPv6** = 128-bit.

### Subnetting
- A **subnet** is a logical subdivision of an IP network.
- Devices in the same subnet share the same most-significant bit-group in their IP address.
- Example: in `192.168.2.30`, `192.168.2` is the **subnet ID** and `.30` is the **host ID**.
- Increases routing efficiency.

### Packets
- Header is **20 bytes**, containing: IP version, length, identification number, flags, protocol, checksum, addresses, **TTL**, etc.
- **TTL (Time to Live)** — the number of "hops" a packet can make before being discarded by a router.

### IPv4 vs IPv6

| | IPv4 | IPv6 |
|---|---|---|
| Size | 32-bit | 128-bit |
| Unique addresses | 2³² | 2¹²⁸ |
| Compatibility | — | Not backward-compatible with IPv4 |

### Middleboxes
- Extra devices that also inspect/interact with IP packets, found at the network or transport layer.

**Firewall** — a type of middlebox:
- Filters IP packets based on rules: IP address, port number, protocol, flags, etc. Can also modify packets.
- Two types: **Stateless** (doesn't track connection state) and **Stateful** (tracks state in cache memory — more efficient).

### NAT (Network Address Translation) — Deep Dive
- Also a middlebox; allows **multiple devices to share one public IP** to access the internet.
- Example: laptop with private IP `10.5.1.2` requests Facebook.
  1. Request reaches the router.
  2. Router replaces the source IP (`10.5.1.2`) with its own public IP (`56.1.5.4`) and forwards the request.
  3. Facebook's server responds to the router's public IP.
  4. Router translates it back and delivers the response to the laptop (`10.5.1.2`).
- Keeps devices within a LAN secured and hidden from the outside internet.

---

## 26. Data Link Layer (Deep Dive)

- Passes packets from the network layer down to the physical layer.
- When a new device joins the network, it connects to the **DHCP server**, which allocates it a new local IP address.
- Devices at this layer communicate using **Data Link layer (MAC) addresses**.
- Data is transferred in **frames**, which contain the sender's Data Link address and the destination's IP address.
- Works closely with the Physical layer below it.

---
